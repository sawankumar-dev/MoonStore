import express from 'express'
import { getAllProducts, getSingleProduct } from '../controllers/product.controller.js'
const productRouter = express.Router()

productRouter.get("/products", getAllProducts)
productRouter.get("/product/:productId", getSingleProduct)

export default productRouter