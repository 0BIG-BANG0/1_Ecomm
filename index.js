//1.Import Express
import express from "express";

import cors from 'cors';
import bodyParser from 'body-parser'
import swagger from 'swagger-ui-express'

import productRouter from "./src/features/product/product.routes.js";
import userRouter from "./src/features/user/user.routes.js";

import jwtAuth from "./src/middlewares/jwt.middleware.js";
import cartRouter from "./src/features/cart/cartItems.routes.js";
import apiDocs from "./swagger.json" assert {type:'json'}
import loggerMiddleware from "./src/middlewares/logger.middleware.js";
import { ApplicationError } from "./src/error-handler/applicationError.js";


//2.Create Server
const app = express();

//cors policy configuration
var corsOptions = {
    origin: 'http://127.0.0.1:5500'
}
app.use(cors(corsOptions))

// app.use((req,res,next)=>{
//     res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
//     res.header('Access-Control-Allow-Headers', '*');
//     res.header('Access-Control-Allow-Methods', '*');
//     //return ok for preflight request.
//     if(req.method == "OPTIONS"){
//         return res.sendStatus(200);
//     }
//     next();
// })


//Using body Parser
app.use(bodyParser.json())

//for all req related to product/users , rediect to product/users routes.

// localhost:3200/api/products
app.use('/api-docs',swagger.serve,swagger.setup(apiDocs));
app.use(loggerMiddleware)
app.use("/api/products", jwtAuth,  productRouter)
// localhost:3200/api/products
app.use("/api/users", userRouter);

app.use("/api/cartItems",jwtAuth,loggerMiddleware, cartRouter);

// 3.Default req Handlers
app.get('/', (req, res) => {
    res.send("Welcome to Ecomm API");
})

//Error handler middleware
app.use((err, req, res, next)=>{
    console.log(err);
    if(err instanceof ApplicationError){
        res.status(err.code).send(err.message);
    }
    //server error
    res.status(500).send("Something went wrong, please try later");
})

// 4.Middleware to handle 404 requests.
app.use((req, res)=>{
    res.status(404).send("API not found. Please check our documentation for more information at localhost:3700/api-docs")
})

export default app;