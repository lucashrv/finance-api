const express = require("express")

//routes
const Users = require("./UsersRoute")
const Categories = require("./CategoriesRoute")
const Transactions = require("./TransactionsRoute")

class IndexRoutes {
    constructor() {
        this.routes = express.Router()

        this.users = new Users()
        this.categories = new Categories()
        this.transactions = new Transactions()
    }

    setup() {
        this.routes.use("/api", this.users.setup())
        this.routes.use("/api", this.categories.setup())
        this.routes.use("/api", this.transactions.setup())

        return this.routes
    }
}

module.exports = new IndexRoutes()
