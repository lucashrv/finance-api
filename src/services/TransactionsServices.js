const { transactions, categories, users } = require("../models")
const {
    handleFindAll,
    handleFindByPk,
    handleFindOne,
    handleCreate,
    handleUpdate,
    handleDestroy,
    handleError
} = require("./handleServices/handleUtils")

module.exports = new (class TransactionsServices {
    async getAll(req) {
        const { id } = req.connectedUser

        const getAll = await handleFindAll(transactions, { user_id: id })

        return getAll
    }

    async create(req) {
        const {
            description,
            transaction,
            category_id
        } = req.body
        const { id } = req.connectedUser

        handleError(
            transaction == 0,
            'O valor não pode ser 0',
            422
        )

        const category = await handleFindByPk(categories, category_id)
        handleError(
            !category,
            'Categoria não encontrada!',
            404
        )

        const user = await handleFindByPk(users, id)

        const create = await handleCreate(transactions, {
            description,
            transaction: parseFloat(transaction),
            type: transaction > 0 ? 'INCOME' : 'EXPENSE',
            balance_updated: (user.balance + parseFloat(transaction)).toFixed(2),
            category_id,
            user_id: id
        })

        await handleUpdate(
            users,
            {
                ...user,
                balance: (user.balance + parseFloat(transaction)).toFixed(2)
            },
            { id }
        )

        return create
    }

    async update(req) {
        const {
            description,
            transaction,
            category_id
        } = req.body
        const { id } = req.params
        const { id: userId } = req.connectedUser

        const category = await handleFindByPk(categories, category_id)
        // handleError(
        //     !category,
        //     'Categoria inexistente!',
        //     404
        // )
        // handleError(  falta update com calculo certo da atualização!!!!! pegando a transaction anterior e atual e calculando o valor que atualizará o balance
        //     category.user_id !== userId,
        //     'Acão negada!',
        //     401
        // )

        // return await handleUpdate(
        //     categories,
        //     { name },
        // { id }
        // )
    }

    // async destroy(req) {
    //     const { id } = req.params
    //     const { id: userId } = req.connectedUser

    //     const category = await handleFindByPk(categories, id)
    //     handleError(
    //         !category,
    //         'Categoria inexistente!',
    //         404
    //     )
    //     handleError(
    //         category.user_id !== userId,
    //         'Acão negada!',
    //         401
    //     )

    //     await handleDestroy(categories, { id })
    // }
})
