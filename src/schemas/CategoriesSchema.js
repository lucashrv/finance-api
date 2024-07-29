const yup = require("./TranslationsYup")

const categoryIdSchema = ({
    params: yup.object({
        id: yup.number().moreThan(0).required()
    }),
})

const categoryCreateSchema = ({
    body: yup.object({
        name: yup.string(40).min(2)
    })
})

const categoryUpdateSchema = ({
    body: yup.object({
        name: yup.string(40).min(2)
    }),
    params: yup.object({
        id: yup.number().moreThan(0).required()
    }),
})


const categoryDestroySchema = ({
    params: yup.object({
        id: yup.number().moreThan(0).required()
    }),
})

module.exports = {
    categoryIdSchema,
    categoryCreateSchema,
    categoryUpdateSchema,
    categoryDestroySchema
}
