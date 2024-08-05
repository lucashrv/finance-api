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
const { Op } = require('sequelize')

module.exports = new (class TransactionsServices {
    async getAll(req) {
        const { startDate, endDate } = req.query
        const { id } = req.connectedUser

        const date = new Date();
        const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
        const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

        const getAll = await handleFindAll(
            transactions,
            {
                user_id: id,
                created_at: {
                    [Op.between]: [startDate || startOfMonth, endDate || endOfMonth]
                }
            },
            {
                order: [['created_at', 'DESC']],
                include: [{ model: categories }]
            }

        )

        return getAll
    }

    async getOne(req) {
        const { id } = req.params
        const { id: userId } = req.connectedUser

        const getOne = await handleFindOne(transactions, {
            id,
            user_id: userId
        })

        return getOne
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

        const user = await handleFindByPk(users, userId)

        const category = await handleFindOne(categories, {
            id: category_id,
            user_id: userId
        })

        handleError(
            !category,
            'Categoria inexistente!',
            404
        )

        const getTransaction = await handleFindByPk(transactions, id)
        handleError(
            !getTransaction,
            'Transação inexistente!',
            404
        )

        await handleUpdate(transactions, {
            description,
            transaction: parseFloat(transaction),
            type: transaction > 0 ? 'INCOME' : 'EXPENSE',
            balance_updated: (user.balance + parseFloat(transaction)).toFixed(2),
            category_id,
            user_id: userId
        }, { id, user_id: userId })

        return await handleUpdate(
            users,
            { balance: (user.balance + (getTransaction.transaction * -1) + parseFloat(transaction)).toFixed(2) },
            { id: userId }
        )
    }

    async destroy(req) {
        const { id } = req.params
        const { id: userId } = req.connectedUser

        const user = await handleFindByPk(users, userId)

        const transaction = await handleFindOne(transactions, {
            id,
            user_id: userId
        })
        handleError(
            !transaction,
            'Transação inexistente!',
            404
        )
        handleError(
            transaction.user_id !== userId,
            'Acão negada!',
            403
        )

        await handleDestroy(transactions, { id })

        return await handleUpdate(
            users,
            { balance: user.balance + (transaction.transaction * -1) },
            { id: userId }
        )
    }
})
