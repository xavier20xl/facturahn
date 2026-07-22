import * as z from 'zod'

const createProduct = z.object({
    code: z.string().min(1),
    name: z.string().min(1),
    price: z.number().positive(),
    stock: z.number().int().min(0)
}).strict()

const updateStock = z.object({
    stock_to_add: z.number().int()
}).strict()

export const validateCreateProduct = (data) => {
    return createProduct.safeParse(data)
}

export const validateUpdateStock = (data) => {
    return updateStock.safeParse(data)
}
