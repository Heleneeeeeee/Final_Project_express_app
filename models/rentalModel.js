module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Rental', {
        amount: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        
        paymentMethod: {
            type: DataTypes.INTEGER
        },

        
    });
    
}