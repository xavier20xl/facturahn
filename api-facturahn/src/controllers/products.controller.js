import ProductsModel from '../models/products.model.js'
import { jsonResponse } from '../helpers/json_response.js'
import { validateCreateProduct, validateUpdateStock } from '../schemas/products.schema.js'

export const getAllProducts = async (req, res) => {

    try {

        const products = await ProductsModel.getAllProducts()

        return res.json(jsonResponse({ message: 'Listado de productos', data: products }))
    } catch (e) {

        return res.status(500).json(jsonResponse({ status: 500, message: e.message, data: null }))
    }
}

export const createProduct = async (req, res) => {

    const payload = req.body

    const { success, data, error } = validateCreateProduct(payload)

    if (!success) {
        return res.status(400).json(jsonResponse({
            status: 400,
            message: 'No pasó las validaciones',
            data: JSON.parse(error.message)
        }))
    }

    try {

        const affected = await ProductsModel.createProduct(data)

        if (affected === 0) {
            return res.status(400).json(jsonResponse({ status: 400, message: 'No se pudo crear el producto', data: null }))
        }

        return res.status(201).json(jsonResponse({ status: 201, message: 'Producto creado', data: null }))
    } catch (e) {

        return res.status(500).json(jsonResponse({ status: 500, message: e.message, data: null }))
    }
}

export const updateProductStock = async (req, res) => {

    const { id } = req.params
    const payload = req.body

    const { success, data, error } = validateUpdateStock(payload)

    if (!success) {
        return res.status(400).json(jsonResponse({
            status: 400,
            message: 'No pasó las validaciones',
            data: JSON.parse(error.message)
        }))
    }

    try {

        const updated = await ProductsModel.updateProductStock(id, data.stock_to_add)

        if (!updated) {
            return res.status(404).json(jsonResponse({ status: 404, message: 'Producto no encontrado', data: null }))
        }

        return res.json(jsonResponse({ message: 'Stock actualizado', data: null }))
    } catch (e) {

        return res.status(500).json(jsonResponse({ status: 500, message: e.message, data: null }))
    }
}
