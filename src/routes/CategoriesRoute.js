const { Router } = require("express")
const CategoriesController = require("../controllers/CategoriesController")
const yupValidation = require("../middlewares/yupValidation")
const {
    categoryCreateSchema,
    categoryUpdateSchema,
    categoryDestroySchema
} = require("../schemas/CategoriesSchema")
const validateToken = require("../middlewares/validateToken")

class CategoriesRoute {
    constructor() {
        this.routes = Router()

        this.categoriesController = new CategoriesController()
    }

    setup() {

        // Private

        this.routes.get(
            "/categories",
            validateToken,
            this.categoriesController.getAll
        )

        this.routes.post(
            "/category",
            validateToken,
            yupValidation(categoryCreateSchema),
            this.categoriesController.create
        )

        this.routes.patch(
            "/category/:id",
            validateToken,
            yupValidation(categoryUpdateSchema),
            this.categoriesController.update
        )

        this.routes.delete(
            "/category/:id",
            validateToken,
            yupValidation(categoryDestroySchema),
            this.categoriesController.destroy
        )

        return this.routes
    }
}

module.exports = CategoriesRoute
