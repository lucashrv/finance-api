"use strict";

const { Model } = require("sequelize")

module.exports = (sequelize, DataTypes) => {
    class Users extends Model {
        static associate(models) { }
    }

    Users.init(
        {
            name: { type: DataTypes.STRING(40), allowNull: false },
            email: { type: DataTypes.STRING(40), allowNull: false },
            password: { type: DataTypes.STRING(), allowNull: false },
            balance: { type: DataTypes.FLOAT(), allowNull: true, defaultValue: 0 }
        },
        {
            sequelize,
            timestamps: true,
            createdAt: "created_at",
            updatedAt: "updated_at",
            modelName: "users"
        }
    )

    return Users
}
