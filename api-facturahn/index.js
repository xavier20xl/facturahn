import express from 'express'
import dotenv from 'dotenv/config'
import productsRouter from './src/routes/products.routes.js'
import invoicesRouter from './src/routes/invoices.routes.js'

const app = express()
app.use(express.json())

const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.send('FacturaHN API')
})

app.use('/api/v1/products', productsRouter)
app.use('/api/v1/invoices', invoicesRouter)

app.listen(PORT, () => {
    console.log(`Servidor en marcha en: http://localhost:${PORT}`)
})
