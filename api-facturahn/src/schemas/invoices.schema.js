import * as z from 'zod'

const createInvoice = z.object({
    customer_name: z.string().min(1, { message: 'El nombre del cliente es requerido' }),
    customer_rtn_id: z.string().optional().default('CF'),
    items: z.array(z.object({
        product_id: z.number().int({ message: 'product_id debe ser un número entero' }).positive({ message: 'product_id debe ser un número positivo' }),
        quantity: z.number().int({ message: 'quantity debe ser un número entero' }).positive({ message: 'quantity debe ser un número positivo' })
    })).min(1, { message: 'La factura debe tener al menos un item' })
}).strict({ message: 'No se permiten campos adicionales' })

export const validateCreateInvoice = (data) => {
    return createInvoice.safeParse(data)
}
