import { Router } from 'express'
import { getAllInvoices, getInvoiceById, createInvoice, voidInvoice } from '../controllers/invoices.controller.js'
import { isAuth } from '../middlewares/isAuth.js'

const invoicesRouter = Router()

invoicesRouter.get('/', isAuth, getAllInvoices)
invoicesRouter.get('/:id', isAuth, getInvoiceById)
invoicesRouter.post('/', isAuth, createInvoice)
invoicesRouter.patch('/:id/void', isAuth, voidInvoice)

export default invoicesRouter
