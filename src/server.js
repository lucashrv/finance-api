const { app } = require("./index")
const { sequelize } = require("./models")

app.listen(process.env.PORT || 3001, async () => {
    console.log("Server started")
    await sequelize.sync({ force: false })
})