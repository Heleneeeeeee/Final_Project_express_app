module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Request', {
        status: {
            type: DataTypes.STRING,
        },
        checkNumber: {
            type:DataTypes.INTEGER
        }
    }, {
        updatedAt: false,
        createdAt:false
    },

    );
}