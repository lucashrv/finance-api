"use strict";

const { Model } = require("sequelize")

module.exports = (sequelize, DataTypes) => {
    class Transactions extends Model {
        static associate(models) {
            this.belongsTo(models.categories, { foreignKey: "category_id" }),
                this.belongsTo(models.users, { foreignKey: "user_id" })
        }
    }

    Transactions.init(
        {
            description: { type: DataTypes.STRING(), allowNull: false },
            transaction: { type: DataTypes.FLOAT(), allowNull: false },
            type: { type: DataTypes.STRING(40), allowNull: false },
            balance_updated: { type: DataTypes.FLOAT(), allowNull: false }
        },
        {
            sequelize,
            timestamps: true,
            createdAt: "created_at",
            updatedAt: "updated_at",
            modelName: "transactions"
        }
    )

    return Transactions
}
