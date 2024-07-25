const { Router } = require("express")
const UsersController = require("../controllers/UsersController")
const yupValidation = require("../middlewares/yupValidation")
const {
    userSignUpSchema,
    userLoginSchema,
    userChangePasswordSchema,
    userChangeNameSchema,
    userAddBalanceSchema
} = require("../schemas/UserSchema")
const validateToken = require("../middlewares/validateToken")

class UsersRoute {
    constructor() {
        this.routes = Router()

        this.usersController = new UsersController()
    }

    setup() {

        // Public

        this.routes.post(
            "/user/signup",
            yupValidation(userSignUpSchema),
            this.usersController.signUp
        )

        this.routes.post(
            "/user/login",
            yupValidation(userLoginSchema),
            this.usersController.login
        )

        // Private

        this.routes.get(
            "/user",
            validateToken,
            this.usersController.getConnectedUser
        )

        this.routes.patch(
            "/user/change-password",
            yupValidation(userChangePasswordSchema),
            validateToken,
            this.usersController.changePassword
        )

        this.routes.patch(
            "/user/change-name",
            yupValidation(userChangeNameSchema),
            validateToken,
            this.usersController.changeName
        )

        this.routes.patch(
            "/user/add-balance",
            yupValidation(userAddBalanceSchema),
            validateToken,
            this.usersController.addBalance
        )

        return this.routes
    }
}

module.exports = UsersRoute
