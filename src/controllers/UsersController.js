const usersServices = require("../services/UsersServices")

class UsersController {
    async signUp(req, res) {
        try {
            const user = await usersServices.signUp(req.body)
            user["password"] = undefined

            return res.status(201).json({
                message: "Usuário criado com sucesso!",
                data: user
            })
        } catch (err) {
            const statusCode = err.status ? err.status : 500
            return res.status(statusCode).json({ error: err.message })
        }
    }

    async login(req, res) {
        try {
            const token = await usersServices.login(req.body)

            return res.status(200).json({
                message: "Autenticado com sucesso!",
                auth: token,
            })
        } catch (err) {
            const statusCode = err.status ? err.status : 500
            return res.status(statusCode).json({ error: err.message })
        }
    }


    async getConnectedUser(req, res) {
        try {
            const user = await usersServices.getConnectedUser(req)
            user["password"] = undefined

            res.status(200).json(user)
        } catch (err) {
            const statusCode = err.status ? err.status : 500
            return res.status(statusCode).json({ error: err.message })
        }
    }

    async changePassword(req, res) {
        try {
            await usersServices.changePassword(req)

            res.status(200).json({ message: "Senha alterada!" })
        } catch (err) {
            const statusCode = err.status ? err.status : 500
            return res.status(statusCode).json({ error: err.message })
        }
    }

    async changeName(req, res) {
        try {
            const name = await usersServices.changeName(req)

            return res.status(200).json({
                message: "Nome alterado!",
                data: { name }
            })
        } catch (err) {
            const statusCode = err.status ? err.status : 500
            return res.status(statusCode).json({ error: err.message })
        }
    }

    async addBalance(req, res) {
        try {
            const balance = await usersServices.addBalance(req)

            return res.status(200).json({
                message: "Saldo alterado!",
                data: balance
            })
        } catch (err) {
            const statusCode = err.status ? err.status : 500
            return res.status(statusCode).json({ error: err.message })
        }
    }
}

module.exports = UsersController
