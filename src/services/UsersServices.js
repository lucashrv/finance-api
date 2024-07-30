const { users } = require("../models")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {
    handleFindByPk,
    handleFindOne,
    handleCreate,
    handleUpdate,
    handleError
} = require("./handleServices/handleUtils")

module.exports = new (class UsersServices {
    async signUp(body) {
        const { email, password, confirmPassword } = body

        handleError(password !== confirmPassword, 'Senhas não correspondem!', 400)

        const userExists = await handleFindOne(users, { email })
        handleError(userExists, "Email já cadastrado!", 422)

        const salt = await bcrypt.genSalt(12)
        const hash = await bcrypt.hash(password, salt)

        const createUser = await handleCreate(users, {
            ...body,
            password: hash
        })

        return createUser
    }

    async login(body) {
        const { email, password } = body

        const user = await handleFindOne(users, { email })
        handleError(!user, "Email inválido!", 400)

        const checkPassword = await bcrypt.compare(password, user.password)
        handleError(!checkPassword, "Senha inválida!", 400)

        const token = jwt.sign(
            { id: user.id },
            process.env.SECRET,
            { expiresIn: "365d" }
        )

        return {
            name: user.name,
            token
        }
    }

    async getConnectedUser(req) {
        const { id } = req.connectedUser

        const connectedUser = await handleFindByPk(users, id)

        return connectedUser
    }

    async changePassword(req) {
        const { id } = req.connectedUser
        const {
            currentPassword,
            newPassword,
            confirmPassword
        } = req.body

        const user = await handleFindByPk(users, id)

        handleError(
            newPassword !== confirmPassword || currentPassword === newPassword,
            'Senhas não correspondem!',
            400
        )

        const passCompare = await bcrypt.compare(currentPassword, user.password)
        handleError(!passCompare, "Senha atual inválida!", 400);

        const salt = await bcrypt.genSalt(12)
        const hash = await bcrypt.hash(newPassword, salt)

        return await handleUpdate(
            users,
            { password: hash },
            { id }
        )
    }

    async changeName(req) {
        const { name } = req.body
        const { id } = req.connectedUser

        await handleUpdate(
            users,
            { name },
            { id }
        )

        return name
    }

    async addBalance(req) {
        const { balance } = req.body
        const { id } = req.connectedUser

        const user = await handleFindByPk(users, id)

        await handleUpdate(
            users,
            { balance: (user.balance + parseFloat(balance)).toFixed(2) },
            { id }
        )

        return {
            balance,
            oldBalance: user.balance,
            balanceUpdated: Number((user.balance + parseFloat(balance)).toFixed(2))
        }
    }
})
