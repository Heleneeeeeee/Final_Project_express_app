const mockUsers = require ('./mock-users')
const mockHolidaysVouchers = require ('./mock-holidaysVouchers')
const mockRentals = require ('./mock-rentals')
const mockLeisures = require ('./mock-leisures')
const mockRequests = require ('./mock-requests')
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

const setHolidaysVouchers = (HolidaysVoucher) => {
    return Promise.all(mockHolidaysVouchers.map((element) => {
        const newHolidaysVoucher = { ...element, id: null }
        return HolidaysVoucher.create(newHolidaysVoucher)
            .then(() => { })
            .catch((error) => {
                console.log(error.message)
            })
    }))
}

const setRentals = (Rental) => {
    return Promise.all(mockRentals.map((element) => {
        const newRental = { ...element, id: null }
        return Rental.create(newRental)
            .then(() => { })
            .catch((error) => {
                console.log(error.message)
            })
    }))
}

const setLeisures = (Leisure) => {
    return Promise.all(mockLeisures.map((element) => {
        const newLeisure = { ...element, id: null }
        return Leisure.create(newLeisure)
            .then(() => { })
            .catch((error) => {
                console.log(error.message)
            })
    }))
}

const setRequests = (Request) => {
    return Promise.all(mockRequests.map((element) => {
        const newRequest = { ...element, id: null }
        return Request.create(newRequest)
            .then(() => { })
            .catch((error) => {
                console.log(error.message)
            })
    }))
}




module.exports = {setRoles, setUsers, setHolidaysVouchers, setRentals, setLeisures, setRequests}