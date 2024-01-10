module.exports = (sequelize, DataTypes) => {
    return sequelize.define('HolidaysVoucher', {
        name : {
            type: DataTypes.STRING
        },

        amount: {
            type: DataTypes.INTEGER,
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