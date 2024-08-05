const yup = require("./TranslationsYup")

const transactionsIdSchema = ({
    params: yup.object({
        id: yup.number().moreThan(0).required()
    }),
})

const transactionsCreateSchema = ({
    body: yup.object({
        description: yup.string().required(),
        transaction: yup.number(),
        category_id: yup.number().moreThan(0).required(),
    })
})

const transactionsUpdateSchema = ({
    body: yup.object({
        description: yup.string().required(),
        transaction: yup.number(),
        category_id: yup.number().moreThan(0).required(),
    }),
    params: yup.object({
        id: yup.number().moreThan(0).required()
    }),
})


const transactionDestroySchema = ({
    params: yup.object({
        id: yup.number().moreThan(0).required()
    }),
})

module.exports = {
    transactionsCreateSchema,
    transactionsIdSchema,
    transactionsUpdateSchema,
    transactionDestroySchema
}
