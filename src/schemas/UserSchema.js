const yup = require("./TranslationsYup")

const userSignUpSchema = ({
    body: yup.object({
        name: yup.string(40).min(2),
        email: yup.string(40).email().min(8),
        password: yup.string().min(8),
        confirmPassword: yup.string().min(8)
    })
})

const userLoginSchema = ({
    body: yup.object({
        email: yup.string(40).email().min(8),
        password: yup.string().min(8)
    })
})


const userChangePasswordSchema = ({
    body: yup.object({
        currentPassword: yup.string().min(8),
        newPassword: yup.string().min(8),
        confirmPassword: yup.string().min(8)
    })
})

const userChangeNameSchema = ({
    body: yup.object({
        name: yup.string(40).min(2)
    })
})

const userAddBalanceSchema = ({
    body: yup.object({
        balance: yup.number().required()
    })
})

module.exports = {
    userSignUpSchema,
    userLoginSchema,
    userChangePasswordSchema,
    userChangeNameSchema,
    userAddBalanceSchema
}
