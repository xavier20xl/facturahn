import bcrypt from 'bcrypt'
import AuthModel from '../models/auth.model.js'
import { jsonResponse } from '../helpers/json_response.js'

export const login = async (req, res) => {

    const { email, password } = req.body

    try {

        const user = await AuthModel.findUserByEmail(email)

        if (!user) {
            return res.status(401).json(jsonResponse({ status: 401, message: 'Credenciales inválidas', data: null }))
        }

        const passwordMatch = await bcrypt.compare(password, user.password_hash)

        if (!passwordMatch) {
            return res.status(401).json(jsonResponse({ status: 401, message: 'Credenciales inválidas', data: null }))
        }

        return res.json(jsonResponse({ message: 'Inicio de sesión exitoso', data: { id: user.id, name: user.name, email: user.email, role: user.role } }))
    } catch (e) {

        return res.status(500).json(jsonResponse({ status: 500, message: e.message, data: null }))
    }
}

export const register = async (req, res) => {

    const { name, email, password } = req.body

    try {

        const password_hash = await bcrypt.hash(password, 10)

        const user = {
            name,
            email,
            password_hash,
            role: 'CASHIER'
        }

        const affected = await AuthModel.registerUser(user)

        if (affected === 0) {
            return res.status(400).json(jsonResponse({ status: 400, message: 'No se pudo registrar el usuario', data: null }))
        }

        return res.status(201).json(jsonResponse({ status: 201, message: 'Usuario registrado', data: null }))
    } catch (e) {

        return res.status(500).json(jsonResponse({ status: 500, message: e.message, data: null }))
    }
}
