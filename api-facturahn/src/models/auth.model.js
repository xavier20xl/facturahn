import { pool } from '../db/db.js'

export default class AuthModel {

    static findUserByEmail = async (email) => {

        try {

            await using conn = await pool.getConnection()

            const [rows] = await conn.execute('SELECT id, name, email, password_hash, role FROM users WHERE email = :email', { email })

            return rows[0]
        } catch (e) {
            throw e
        }
    }

    static registerUser = async (user) => {

        try {

            await using conn = await pool.getConnection()

            const [result] = await conn.execute(
                'INSERT INTO users (name, email, password_hash, role) VALUES (:name, :email, :password_hash, :role)', user)

            return result.affectedRows
        } catch (e) {
            throw e
        }
    }
}
