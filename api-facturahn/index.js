import express from 'express'
import dotenv from 'dotenv/config'

const app = express()
app.use(express.json())

const PORT = process.env.PORT || 3000

app.get('/api/v1', (req, res) => {
    res.send('FacturaHN API')
})

app.listen(PORT, () => {
    console.log(`Servidor en marcha en: http://localhost:${PORT}`)
})
