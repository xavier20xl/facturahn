import { Router } from 'express'
import { getAllProducts, createProduct, updateProductStock } from '../controllers/products.controller.js'
import { isAuth } from '../middlewares/isAuth.js'

const productsRouter = Router()

productsRouter.get('/', getAllProducts)
productsRouter.post('/', isAuth, createProduct)
productsRouter.patch('/:id/stock', isAuth, updateProductStock)

export default productsRouter
