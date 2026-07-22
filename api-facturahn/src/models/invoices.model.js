import { pool } from '../db/db.js'

export default class InvoicesModel {

    static getAllInvoices = async (userId, role) => {

        try {

            await using conn = await pool.getConnection()

            let sql = `SELECT 
                i.id, i.invoice_number, i.customer_name, i.customer_rtn_id, 
                i.subtotal, i.tax, i.total, i.status, i.created_at,
                u.name AS user_name
            FROM invoices i
            JOIN users u ON i.user_id = u.id`

            if (role === 'CASHIER') {
                sql += ' WHERE i.user_id = :userId'
            }

            sql += ' ORDER BY i.created_at DESC'

            const [rows] = await conn.execute(sql, { userId })

            return rows
        } catch (e) {
            throw e
        }
    }

    static getInvoiceById = async (id) => {

        try {

            await using conn = await pool.getConnection()

            const [invoice] = await conn.execute(`SELECT 
                i.id, i.invoice_number, i.customer_name, i.customer_rtn_id, 
                i.subtotal, i.tax, i.total, i.status, i.created_at,
                u.name AS user_name
            FROM invoices i
            JOIN users u ON i.user_id = u.id
            WHERE i.id = :id`, { id })

            if (invoice.length === 0) return null

            const [details] = await conn.execute(`SELECT 
                id.id, id.quantity, id.unit_price, id.subtotal,
                p.code, p.name AS product_name
            FROM invoice_details id
            JOIN products p ON id.product_id = p.id
            WHERE id.invoice_id = :invoice_id`, { invoice_id: id })

            return { ...invoice[0], details }
        } catch (e) {
            throw e
        }
    }

    static createInvoice = async (data, userId) => {

        await using conn = await pool.getConnection()

        try {

            await conn.beginTransaction()

            // 1. Validar stock de cada producto
            for (const item of data.items) {
                const [product] = await conn.execute(
                    'SELECT id, price, stock FROM products WHERE id = :product_id AND is_active = true',
                    { product_id: item.product_id }
                )

                if (product.length === 0) {
                    throw new Error(`Producto ${item.product_id} no encontrado o inactivo`)
                }

                if (product[0].stock < item.quantity) {
                    throw new Error(`Stock insuficiente para ${product[0].name}: disponible ${product[0].stock}, solicitado ${item.quantity}`)
                }

                item.unit_price = product[0].price
                item.subtotal = product[0].price * item.quantity
            }

            // 2. Calcular totales
            const subtotal = data.items.reduce((sum, item) => sum + item.subtotal, 0)
            const tax = Math.round(subtotal * 0.15 * 100) / 100
            const total = Math.round((subtotal + tax) * 100) / 100

            // 3. Generar número de factura
            const invoiceNumber = 'FAC-' + String(Date.now()).slice(-8)

            // 4. Insertar factura
            const [invoiceResult] = await conn.execute(
                `INSERT INTO invoices (invoice_number, user_id, customer_name, customer_rtn_id, subtotal, tax, total)
                VALUES (:invoice_number, :user_id, :customer_name, :customer_rtn_id, :subtotal, :tax, :total)`,
                {
                    invoice_number: invoiceNumber,
                    user_id: userId,
                    customer_name: data.customer_name,
                    customer_rtn_id: data.customer_rtn_id || 'CF',
                    subtotal,
                    tax,
                    total
                }
            )

            const invoiceId = invoiceResult.insertId

            // 5. Insertar detalles y decrementar stock
            for (const item of data.items) {
                await conn.execute(
                    `INSERT INTO invoice_details (invoice_id, product_id, quantity, unit_price, subtotal)
                    VALUES (:invoice_id, :product_id, :quantity, :unit_price, :subtotal)`,
                    {
                        invoice_id: invoiceId,
                        product_id: item.product_id,
                        quantity: item.quantity,
                        unit_price: item.unit_price,
                        subtotal: item.subtotal
                    }
                )

                await conn.execute(
                    'UPDATE products SET stock = stock - :quantity WHERE id = :product_id',
                    { quantity: item.quantity, product_id: item.product_id }
                )
            }

            await conn.commit()

            return await InvoicesModel.getInvoiceById(invoiceId)
        } catch (e) {
            await conn.rollback()
            throw e
        }
    }

    static voidInvoice = async (id) => {

        await using conn = await pool.getConnection()

        try {

            await conn.beginTransaction()

            // 1. Verificar que la factura existe y está ISSUED
            const [invoice] = await conn.execute(
                'SELECT id, status FROM invoices WHERE id = :id FOR UPDATE',
                { id }
            )

            if (invoice.length === 0) {
                throw new Error('Factura no encontrada')
            }

            if (invoice[0].status === 'VOIDED') {
                throw new Error('La factura ya está anulada')
            }

            // 2. Restituir stock de cada producto
            const [details] = await conn.execute(
                'SELECT product_id, quantity FROM invoice_details WHERE invoice_id = :invoice_id',
                { invoice_id: id }
            )

            for (const detail of details) {
                await conn.execute(
                    'UPDATE products SET stock = stock + :quantity WHERE id = :product_id',
                    { quantity: detail.quantity, product_id: detail.product_id }
                )
            }

            // 3. Marcar factura como anulada
            await conn.execute(
                "UPDATE invoices SET status = 'VOIDED' WHERE id = :id",
                { id }
            )

            await conn.commit()

            return true
        } catch (e) {
            await conn.rollback()
            throw e
        }
    }
}
