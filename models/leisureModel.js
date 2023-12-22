module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Leisure', {
        activity: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        
        beneficiary: {
            type: DataTypes.STRING
        },

        receipt: {
            type: DataTypes.STRING,
            allowNull: false,
        }
        
    });
    
}