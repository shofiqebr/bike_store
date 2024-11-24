import { Router } from "express";
import { productController } from "./product.controller";


const productRouter = Router()

productRouter.post('/api/products', productController.createProduct)
productRouter.get('/api/products/:productId', productController.getSingleProduct)
productRouter.put('/api/products/:productId', productController.updateProduct)
productRouter.delete('/api/products/:productId', productController.deletProduct)
productRouter.get('/api/products', productController.getProduct)

export default productRouter