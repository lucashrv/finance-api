const yup = require("./TranslationsYup")

const transactionsCreateSchema = ({
    body: yup.object({
        description: yup.string().notRequired(),
        transaction: yup.number(),
        category_id: yup.number().moreThan(0).required(),
    })
})

// const categoryUpdateSchema = ({
//     body: yup.object({
//         name: yup.string(40).min(2)
//     }),
//     params: yup.object({
//         id: yup.number().moreThan(0).required()
//     }),
// })


// const categoryDestroySchema = ({
//     params: yup.object({
//         id: yup.number().moreThan(0).required()
//     }),
// })

module.exports = {
    transactionsCreateSchema
}
