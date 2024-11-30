const transactionsServices = require("../services/TransactionsServices")

class TransactionsController {
    async getAll(req, res) {
        try {
            const getAll = await transactionsServices.getAll(req)

            return res.status(200).json(getAll)
        } catch (err) {
            const statusCode = err.status ? err.status : 500
            return res.status(statusCode).json({ error: err.message })
        }
    }

    async getFindCountAll(req, res) {
        try {
            const getFindCountAll = await transactionsServices.getFindCountAll(req)

            return res.status(200).json(getFindCountAll)
        } catch (err) {
            const statusCode = err.status ? err.status : 500
            console.log(err);

            return res.status(statusCode).json({ error: err.message })
        }
    }

    async getAllDate(req, res) {
        try {
            const getAllDate = await transactionsServices.getAllDate(req)

            return res.status(200).json(getAllDate)
        } catch (err) {
            const statusCode = err.status ? err.status : 500
            return res.status(statusCode).json({ error: err.message })
        }
    }

    async getOne(req, res) {
        try {
            const getOne = await transactionsServices.getOne(req)

            return res.status(200).json(getOne)
        } catch (err) {
            const statusCode = err.status ? err.status : 500
            return res.status(statusCode).json({ error: err.message })
        }
    }

    async create(req, res) {
        try {
            const create = await transactionsServices.create(req)

            return res.status(201).json({
                message: "Transação criada com sucesso!",
                data: create
            })
        } catch (err) {
            const statusCode = err.status ? err.status : 500
            return res.status(statusCode).json({ error: err.message })
        }
    }

    async update(req, res) {
        try {
            await transactionsServices.update(req)

            return res.status(200).json({ message: "Transação atualizada com sucesso!" })
        } catch (err) {
            const statusCode = err.status ? err.status : 500
            return res.status(statusCode).json({ error: err.message })
        }
    }

    async destroy(req, res) {
        try {
            await transactionsServices.destroy(req)

            return res.status(200).json({ message: "Transação deletada com sucesso!" })
        } catch (err) {
            const statusCode = err.status ? err.status : 500
            return res.status(statusCode).json({ error: err.message })
        }
    }
}

module.exports = TransactionsController
