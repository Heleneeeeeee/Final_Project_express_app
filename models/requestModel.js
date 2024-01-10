module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Request', {
        status: {
            type: DataTypes.STRING,
        },
        
    }

    );
}