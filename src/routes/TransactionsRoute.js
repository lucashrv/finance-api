const { Router } = require("express")
const TransactionsController = require("../controllers/TransactionsController")
const yupValidation = require("../middlewares/yupValidation")
const {
    transactionsCreateSchema
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

        this.routes.post(
            "/transaction",
            yupValidation(transactionsCreateSchema),
            validateToken,
            this.transactionsController.create
        )

        // this.routes.patch(
        //     "/user/change-name",
        //     yupValidation(userChangeNameSchema),
        //     validateToken,
        //     this.transactionsController.changeName
        // )

        return this.routes
    }
}

module.exports = TransactionsRoute
