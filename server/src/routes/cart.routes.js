import express from 'express'
import { verifyJwt } from '../middlewares/auth.middleware.js';
import { addToCart, getMyCart, removeFromCart, updateCartQuantity } from '../controllers/cart.controller.js';

const cartRouter = express.Router();

cartRouter.use(verifyJwt)

cartRouter.post("/", addToCart)
cartRouter.get("/",  getMyCart)
cartRouter.delete("/:productId",  removeFromCart)
cartRouter.patch("/:productId",  updateCartQuantity)

export default cartRouter