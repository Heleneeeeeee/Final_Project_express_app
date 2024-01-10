module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Leisure', {
        name: {
            type: DataTypes.STRING,
        },
        
        activity: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        
        beneficiary: {
            type: DataTypes.STRING
        },

        receipt: {
            type: DataTypes.STRING,
            // allowNull: false,
        },
        
        checkNumbers: {
            type: DataTypes.INTEGER,
            // allowNull: false,
        }
    });
    
}