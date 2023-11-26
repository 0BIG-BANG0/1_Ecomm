//1.Import Express
import express from "express";
import productRouter from "./src/features/product/product.routes.js";


//2.Create Server
const app = express();

//for all req related to product , rediect to product routes.
// localhost:3200/api/products
app.use("/api/products", productRouter)

// 3.Default req Handlers
app.get('/', (req, res) => {
    res.send("Welcome to Ecomm API");
})

export default app;