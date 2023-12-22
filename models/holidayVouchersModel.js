module.exports = (sequelize, DataTypes) => {
    return sequelize.define('HolidayVouchers', {
        amount: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        
        paymentMethod: {
            type: DataTypes.INTEGER
        },

        
    });
    
}