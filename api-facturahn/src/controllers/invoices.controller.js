import InvoicesModel from '../models/invoices.model.js'
import { jsonResponse } from '../helpers/json_response.js'

export const getAllInvoices = async (req, res) => {

    try {

        const invoices = await InvoicesModel.getAllInvoices()

        return res.json(jsonResponse({ message: 'Listado de facturas', data: invoices }))
    } catch (e) {

        return res.status(500).json(jsonResponse({ status: 500, message: e.message, data: null }))
    }
}

export const getInvoiceById = async (req, res) => {

    const { id } = req.params

    try {

        const invoice = await InvoicesModel.getInvoiceById(id)

        if (!invoice) {
            return res.status(404).json(jsonResponse({ status: 404, message: 'Factura no encontrada', data: null }))
        }

        return res.json(jsonResponse({ message: 'Detalle de factura', data: invoice }))
    } catch (e) {

        return res.status(500).json(jsonResponse({ status: 500, message: e.message, data: null }))
    }
}

export const createInvoice = async (req, res) => {

    const payload = req.body
    const userId = req.user?.id || 1

    if (!payload.items || payload.items.length === 0) {
        return res.status(400).json(jsonResponse({ status: 400, message: 'La factura debe tener al menos un item', data: null }))
    }

    try {

        const invoice = await InvoicesModel.createInvoice(payload, userId)

        return res.status(201).json(jsonResponse({ status: 201, message: 'Factura creada', data: invoice }))
    } catch (e) {

        if (e.message.startsWith('Stock insuficiente') || e.message.startsWith('Producto')) {
            return res.status(400).json(jsonResponse({ status: 400, message: e.message, data: null }))
        }

        return res.status(500).json(jsonResponse({ status: 500, message: e.message, data: null }))
    }
}

export const voidInvoice = async (req, res) => {

    const { id } = req.params

    try {

        await InvoicesModel.voidInvoice(id)

        return res.json(jsonResponse({ message: 'Factura anulada correctamente', data: null }))
    } catch (e) {

        if (e.message.includes('ya está anulada')) {
            return res.status(409).json(jsonResponse({ status: 409, message: e.message, data: null }))
        }

        if (e.message.includes('no encontrada')) {
            return res.status(404).json(jsonResponse({ status: 404, message: e.message, data: null }))
        }

        return res.status(500).json(jsonResponse({ status: 500, message: e.message, data: null }))
    }
}
