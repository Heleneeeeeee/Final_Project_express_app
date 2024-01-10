module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Rental', {
        name: {
            type: DataTypes.STRING,
        },
        
        amount: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        
        paymentMethod: {
            type: DataTypes.INTEGER
        },

        checkNumber: {
            type:DataTypes.INTEGER
        },
        
    });
    
}