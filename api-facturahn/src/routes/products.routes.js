import { Router } from 'express'
import { getAllProducts, createProduct, updateProductStock } from '../controllers/products.controller.js'
import { isAuth } from '../middlewares/isAuth.js'
import { hasRole } from '../middlewares/hasRole.js'

const productsRouter = Router()

productsRouter.get('/', getAllProducts)
productsRouter.post('/', isAuth, hasRole('ADMIN'), createProduct)
productsRouter.patch('/:id/stock', isAuth, hasRole('ADMIN'), updateProductStock)

export default productsRouter
