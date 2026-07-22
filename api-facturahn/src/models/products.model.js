import { pool } from '../db/db.js'

export default class ProductsModel {

    static getAllProducts = async () => {

        try {

            await using conn = await pool.getConnection()

            const [rows] = await conn.query('SELECT id, code, name, price, stock FROM products WHERE is_active = true')

            return rows
        } catch (e) {
            throw e
        }
    }

    static getProductById = async (id) => {

        try {

            await using conn = await pool.getConnection()

            const [rows] = await conn.execute('SELECT id, code, name, price, stock FROM products WHERE id = :id', { id })

            return rows[0]
        } catch (e) {
            throw e
        }
    }

    static createProduct = async (product) => {

        try {

            await using conn = await pool.getConnection()

            const [result] = await conn.execute(
                'INSERT INTO products (code, name, price, stock) VALUES (:code, :name, :price, :stock)', product)

            return result.affectedRows
        } catch (e) {
            throw e
        }
    }

    static updateProductStock = async (id, stock_to_add) => {

        try {

            await using conn = await pool.getConnection()

            const [result] = await conn.execute(
                'UPDATE products SET stock = stock + :stock_to_add WHERE id = :id', { id, stock_to_add })

            return result.affectedRows > 0
        } catch (e) {
            throw e
        }
    }
}
