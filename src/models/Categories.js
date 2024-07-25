"use strict";

const { Model } = require("sequelize")

module.exports = (sequelize, DataTypes) => {
    class Categories extends Model {
        static associate(models) {
            this.belongsTo(models.users, { foreignKey: "user_id" })
        }
    }

    Categories.init(
        {
            name: { type: DataTypes.STRING(20), allowNull: false },
        },
        {
            sequelize,
            timestamps: true,
            createdAt: "created_at",
            updatedAt: "updated_at",
            modelName: "categories"
        }
    )

    return Categories
}
