import jwt from 'jsonwebtoken'
import { jsonResponse } from '../helpers/json_response.js'

export const isAuth = async (req, res, next) => {

    try {

        const authHeader = req.headers.authorization

        if (!authHeader) {
            return res.status(401).json(jsonResponse({ status: 401, message: 'Token no proporcionado', data: null }))
        }

        const [bearer, token] = authHeader.split(' ')

        if (bearer !== 'Bearer' || !token) {
            return res.status(401).json(jsonResponse({ status: 401, message: 'Formato de token inválido', data: null }))
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.user = decoded

        next()
    } catch (e) {

        return res.status(401).json(jsonResponse({ status: 401, message: 'Token inválido o expirado', data: null }))
    }
}
