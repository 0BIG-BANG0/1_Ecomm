//1.Import Express
import express from "express";
import bodyParser from 'body-parser'
import productRouter from "./src/features/product/product.routes.js";
import userRouter from "./src/features/user/user.routes.js";

import jwtAuth from "./src/middlewares/jwt.middleware.js";



//2.Create Server
const app = express();

//Using body Parser
app.use(bodyParser.json())

//for all req related to product/users , rediect to product/users routes.

// localhost:3200/api/products
app.use("/api/products", jwtAuth,  productRouter)
// localhost:3200/api/products
app.use("/api/users", userRouter)

// 3.Default req Handlers
app.get('/', (req, res) => {
    res.send("Welcome to Ecomm API");
})

export default app;