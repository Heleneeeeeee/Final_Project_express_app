module.exports = (sequelize, DataTypes, Role) => {
    return sequelize.define('User', {
        firstname: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        lastname: {
            type: DataTypes.STRING,
            allowNull: false
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: "Le mail est déjà pris."
            },
        },

        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: "Le nom d'utilisateur est déjà pris."
            },  
        },
        
        matricule: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false
        },

    }
    );
}