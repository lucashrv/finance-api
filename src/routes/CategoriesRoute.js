const { Router } = require("express")
const CategoriesController = require("../controllers/CategoriesController")
const yupValidation = require("../middlewares/yupValidation")
const {
    categoryIdSchema,
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

        this.routes.get(
            "/category/:id",
            validateToken,
            yupValidation(categoryIdSchema),
            this.categoriesController.getOne
        )

        this.routes.post(
            "/category",
            validateToken,
            yupValidation(categoryCreateSchema),
            this.categoriesController.create
        )

        this.routes.put(
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
