const { Router } = require("express")
const TransactionsController = require("../controllers/TransactionsController")
const yupValidation = require("../middlewares/yupValidation")
const {
    transactionsCreateSchema,
    transactionsIdSchema,
    transactionsUpdateSchema,
    transactionDestroySchema
} = require("../schemas/TransactionsSchema")
const validateToken = require("../middlewares/validateToken")

class TransactionsRoute {
    constructor() {
        this.routes = Router()

        this.transactionsController = new TransactionsController()
    }

    setup() {

        // Private

        this.routes.get(
            "/transactions",
            validateToken,
            this.transactionsController.getAll
        )

        this.routes.get(
            "/transaction/:id",
            yupValidation(transactionsIdSchema),
            validateToken,
            this.transactionsController.getOne
        )

        this.routes.post(
            "/transaction",
            yupValidation(transactionsCreateSchema),
            validateToken,
            this.transactionsController.create
        )

        this.routes.put(
            "/transaction/:id",
            yupValidation(transactionsUpdateSchema),
            validateToken,
            this.transactionsController.update
        )

        this.routes.delete(
            "/transaction/:id",
            yupValidation(transactionDestroySchema),
            validateToken,
            this.transactionsController.destroy
        )

        return this.routes
    }
}

module.exports = TransactionsRoute
