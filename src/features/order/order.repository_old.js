import { ObjectId } from "mongodb";
import { getClient, getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";
import OrderModel from "./order.model.js";

export default class OrderRepository {
  constructor() {
    this.collection = "orders";
  }

  async placeOrder(userId) {
    try {
      const client  = getClient();
      const session = client.startSession()
      const db = getDB();
      session.startTransaction();
      //1. Get cartItems and calculate total amount.
      const items = await this.getTotalAmount(userId, session);
      const finalTotalAmount = items.reduce(
        (acc, item) => acc + item.totalAmount,
        0
      );
      console.log("Final Total Amount:", finalTotalAmount);

      //2. Create an order record.: 
      // ChatGPT : https://chat.openai.com/share/21be69c4-d0db-4695-bab3-49a568606fb8
      const newOrder = new OrderModel(
        new ObjectId(userId),
        finalTotalAmount,
        new Date()
      );
      await db.collection(this.collection).insertOne(newOrder, {session});

      //3. Reduce the stock. 
      // ChatGpt : https://chat.openai.com/share/95a7a502-bee6-4812-93dc-77c3f7e855fe
      for (let item of items) {
        await db
          .collection("products")
          .updateOne(
            { _id: item.productID },
            { $inc: { stock: -item.quantity } },{session}
          );
      }
      throw new Error("Something is wrong in placeOrder")
      //4.Clear the cart items
      await db.collection("cartItems").deleteMany({
        userId: new ObjectId(userId),
      },{session});
      return;
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with the database", 500);
    }
  }

  async getTotalAmount(userId, session) {
    const db = getDB();

    const items = await db
      .collection("cartItems")
      .aggregate([
        //1. Get cart items for the user
        {
          $match: { userID: new ObjectId(userId) },
        },
        // 2. Get the products from products collection.
        {
          $lookup: {
            from: "products",
            localField: "productID",
            foreignField: "_id",
            as: "productInfo",
          },
        },
        //3. Unwind the productInfo.
        {
          $unwind: "$productInfo",
        },
        //4. Calculate totalAmount for each cart Items.
        {
          $addFields: {
            totalAmount: {
              $multiply: ["$productInfo.price", "$quantity"],
            },
          },
        },
      ], {session})
      .toArray();
    return items;
    console.log(items);
  }
}
