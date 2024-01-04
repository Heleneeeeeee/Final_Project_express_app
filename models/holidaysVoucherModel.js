module.exports = (sequelize, DataTypes) => {
    return sequelize.define('HolidaysVoucher', {
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        
        paymentMethod: {
            type: DataTypes.INTEGER
        },

        UserId : {
            type: DataTypes.INTEGER,
        }

        
    });
    
}