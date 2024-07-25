const categoriesServices = require("../services/CategoriesServices")

class CategoriesController {
    async getAll(req, res) {
        try {
            const getAll = await categoriesServices.getAll(req)

            return res.status(200).json(getAll)
        } catch (err) {
            const statusCode = err.status ? err.status : 500
            return res.status(statusCode).json({ error: err.message })
        }
    }

    async create(req, res) {
        try {
            const create = await categoriesServices.create(req)

            return res.status(201).json({
                message: "Categoria criada com sucesso!",
                data: create
            })
        } catch (err) {
            const statusCode = err.status ? err.status : 500
            return res.status(statusCode).json({ error: err.message })
        }
    }

    async update(req, res) {
        try {
            await categoriesServices.update(req)

            return res.status(200).json({ message: "Categoria atualizada com sucesso!" })
        } catch (err) {
            const statusCode = err.status ? err.status : 500
            return res.status(statusCode).json({ error: err.message })
        }
    }

    async destroy(req, res) {
        try {
            await categoriesServices.destroy(req)

            return res.status(200).json({ message: "Categoria deletada com sucesso!" })
        } catch (err) {
            const statusCode = err.status ? err.status : 500
            return res.status(statusCode).json({ error: err.message })
        }
    }
}

module.exports = CategoriesController
