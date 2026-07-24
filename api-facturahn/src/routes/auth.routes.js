import { Router } from 'express'
import { login, register } from '../controllers/auth.controller.js'
import { isAuth } from '../middlewares/isAuth.js'
import { hasRole } from '../middlewares/hasRole.js'

const authRouter = Router()

authRouter.post('/login', login)
authRouter.post('/register', isAuth, hasRole('ADMIN'), register)

export default authRouter
