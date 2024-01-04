const mockUsers = require ('./mock-users')
const bcrypt = require ('bcrypt')

const setRoles = (Role) => {
    Promise.all ([Role.create({ label: "admin" }), Role.create({ label: "edit" })])
}

const setUsers = (User) => {
    return Promise.all(mockUsers.map(user => {
        return bcrypt.hash(user.password, 10)
            .then(hashResult => {
                return User.create({ ...user, password: hashResult })
                    .then(() => { })
                    .catch((error) => {
                        console.log(error.message)
                    })
            })
    }))
}

module.exports = {setRoles, setUsers}