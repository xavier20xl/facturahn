import * as z from 'zod'

const createProduct = z.object({
    code: z.string().min(1, { message: 'El código es requerido' }),
    name: z.string().min(1, { message: 'El nombre es requerido' }),
    price: z.number().positive({ message: 'El precio debe ser un número positivo' }),
    stock: z.number().int({ message: 'El stock debe ser un número entero' }).min(0, { message: 'El stock no puede ser negativo' })
}).strict({ message: 'No se permiten campos adicionales' })

const updateStock = z.object({
    stock_to_add: z.number().int({ message: 'stock_to_add debe ser un número entero' })
}).strict({ message: 'No se permiten campos adicionales' })

export const validateCreateProduct = (data) => {
    return createProduct.safeParse(data)
}

export const validateUpdateStock = (data) => {
    return updateStock.safeParse(data)
}
