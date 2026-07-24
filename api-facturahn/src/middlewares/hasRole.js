import { jsonResponse } from '../helpers/json_response.js'

export const hasRole = (...roles) => {

    return (req, res, next) => {

        try {

            if (!req.user) {
                return res.status(401).json(jsonResponse({ status: 401, message: 'No autenticado', data: null }))
            }

            if (!roles.includes(req.user.role)) {
                return res.status(403).json(jsonResponse({ status: 403, message: 'No tienes permisos para esta acción', data: null }))
            }

            next()
        } catch (e) {

            return res.status(500).json(jsonResponse({ status: 500, message: e.message, data: null }))
        }
    }
}
