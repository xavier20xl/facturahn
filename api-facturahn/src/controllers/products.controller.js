import ProductsModel from '../models/products.model.js'
import { jsonResponse } from '../helpers/json_response.js'

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

    try {

        const affected = await ProductsModel.createProduct(payload)

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
    const { stock_to_add } = req.body

    try {

        const updated = await ProductsModel.updateProductStock(id, stock_to_add)

        if (!updated) {
            return res.status(404).json(jsonResponse({ status: 404, message: 'Producto no encontrado', data: null }))
        }

        return res.json(jsonResponse({ message: 'Stock actualizado', data: null }))
    } catch (e) {

        return res.status(500).json(jsonResponse({ status: 500, message: e.message, data: null }))
    }
}
