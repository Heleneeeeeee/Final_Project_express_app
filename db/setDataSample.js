const setRoles = (Role) => {
    Promise.all ([Role.create({ label: "admin" }), Role.create({ label: "edit" })])
}

module.exports = {setRoles}