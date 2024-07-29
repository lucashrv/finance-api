const { categories, users } = require("../models")
const {
    handleFindAll,
    handleFindByPk,
    handleFindOne,
    handleCreate,
    handleUpdate,
    handleDestroy,
    handleError
} = require("./handleServices/handeUtils")

module.exports = new (class CategoriesServices {
    async getAll(req) {
        const { id } = req.connectedUser

        const getAll = await handleFindAll(categories, { user_id: id })

        return getAll
    }

    async getOne(req) {
        const { id: userId } = req.connectedUser
        const { id } = req.params

        const category = await handleFindByPk(categories, id)

        handleError(
            category.user_id !== userId,
            'Acão negada!',
            401
        )

        return category
    }

    async create(req) {
        const { name } = req.body
        const { id } = req.connectedUser

        const category = await handleFindOne(categories, {
            name,
            user_id: id
        })
        handleError(
            category,
            'Categoria já cadastrada!',
            422
        )

        const create = await handleCreate(categories, {
            name,
            user_id: id
        })

        return create
    }

    async update(req) {
        const { name } = req.body
        const { id } = req.params
        const { id: userId } = req.connectedUser

        const category = await handleFindByPk(categories, id)
        const categoryExists = await handleFindOne(categories, {
            name,
            user_id: userId
        })
        handleError(
            categoryExists,
            'Nome da categoria já cadastrado!',
            422
        )
        handleError(
            !category,
            'Categoria inexistente!',
            404
        )
        handleError(
            category.user_id !== userId,
            'Acão negada!',
            401
        )

        return await handleUpdate(
            categories,
            { name },
            { id }
        )
    }

    async destroy(req) {
        const { id } = req.params
        const { id: userId } = req.connectedUser

        const category = await handleFindByPk(categories, id)
        handleError(
            !category,
            'Categoria inexistente!',
            404
        )
        handleError(
            category.user_id !== userId,
            'Acão negada!',
            401
        )

        await handleDestroy(categories, { id })
    }
})
