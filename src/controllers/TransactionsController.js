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

    // async update(req, res) {
    //     try {
    //         await transactionsServices.update(req)

    //         return res.status(200).json({ message: "Categoria atualizada com sucesso!" })
    //     } catch (err) {
    //         const statusCode = err.status ? err.status : 500
    //         return res.status(statusCode).json({ error: err.message })
    //     }
    // }

    // async destroy(req, res) {
    //     try {
    //         await categoriesServices.destroy(req)

    //         return res.status(200).json({ message: "Categoria deletada com sucesso!" })
    //     } catch (err) {
    //         const statusCode = err.status ? err.status : 500
    //         return res.status(statusCode).json({ error: err.message })
    //     }
    // }
}

module.exports = TransactionsController
