// 1.Import express.
import express from "express";
import { CartItemController } from "./cartItems.controller.js";


//2. Initialize Express router
const cartRouter = express.Router();

//instantiate the product Controller
const cartController = new CartItemController();

cartRouter.delete('/:id', (req, res) => { cartController.delete(req, res) })
cartRouter.post('/', (req, res) => { cartController.add(req, res) });
cartRouter.get('/', (req, res) => { cartController.get(req, res) });

export default cartRouter;