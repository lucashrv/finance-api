const { Op } = require("sequelize");

class handleUtils {
    handleFindAll = (model, filter, options) => {
        return model.findAll({
            where: { [Op.and]: [filter] },
            raw: true,
            ...options
        });
    };

    handleFindCountAll = (model, filter, options) => {
        return model.findAndCountAll({
            where: { [Op.and]: [filter] },
            raw: true,
            ...options
        });
    };

    handleFindOrderAll = (model, filter, order) => {
        return model.findAll({
            where: { [Op.and]: [filter] },
            order: [order],
            raw: true
        });
    };

    handleFindOne = (model, filter) => {
        return model.findOne({
            where: filter,
            raw: true
        })
    }

    handleFindByPk = (model, filter) => {
        return model.findByPk(filter, { raw: true });
    };

    handleCreate = (model, value) => {
        try {
            return model.create({ ...value });
        } catch (err) {
            throw new Error({ error: err });
        }
    };

    handleUpdate = (model, value, filter) => {
        try {
            return model.update(
                { ...value },
                { where: { [Op.and]: [filter] } }
            );
        } catch (err) {
            throw new Error({ error: err });
        }
    };

    handleDestroy = (model, filter) => {
        try {
            return model.destroy({
                where: { [Op.and]: [filter] },
            });
        } catch (err) {
            throw new Error({ error: err });
        }
    };

    handleError(verify, message, status) {
        if (verify) {
            const error = new Error(message);
            error.status = status || 500;
            throw error;
        }
    }
}

module.exports = new handleUtils();
