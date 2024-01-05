const {Sequelize, DataTypes}  = require('sequelize');
const RoleModel = require ('../models/roleModel');
const UserModel = require ('../models/usersModel');
const RequestModel = require('../models/requestModel');
const HolidaysVoucherModel = require('../models/holidaysVoucherModel');
const LeisureModel = require('../models/leisureModel');
const RentalModel = require('../models/rentalModel');
const  {setRoles, setUsers} = require ('./setDataSample');


const sequelize = new Sequelize ('cse_fojl', 'root', '', {
    host: 'localhost',
    dialect:'mariadb',
    logging: false
});

const Role = RoleModel(sequelize, DataTypes)
const User = UserModel(sequelize, DataTypes)
const Request = RequestModel(sequelize, DataTypes)
const HolidaysVoucher = HolidaysVoucherModel(sequelize, DataTypes)
const Leisure = LeisureModel(sequelize, DataTypes)
const Rental = RentalModel(sequelize, DataTypes)

Role.hasMany(User)
User.belongsTo(Role)

User.hasMany(Request)
Request.belongsTo(User)

Leisure.hasMany(Request)
Request.belongsTo(Leisure)

HolidaysVoucher.hasMany(Request)
Request.belongsTo(HolidaysVoucher)

Rental.hasMany(Request)
Request.belongsTo(Rental)

sequelize.sync({ force: true })
    .then (async()=> {
        await setRoles(Role)
        await setUsers(User)
        
})


sequelize.authenticate()
    .then(() => console.log('La connexion à la base de données a bien été établie.'))
    .catch(error => console.error(`Impossible de se connecter à la base de données ${error}`))

module.exports = { Role, User, Leisure, Request, Rental, HolidaysVoucher, sequelize }