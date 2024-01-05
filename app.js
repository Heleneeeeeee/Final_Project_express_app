const express = require ('express')
const morgan = require ('morgan')
const app = express ()
const port = 3005

const {sequelize} = require('./db/sequelizeSetup')

app.use(express.json())
app.use(morgan('dev'))

app.get('/', (req, res) => {
    res.json('Hello World !')
})

app.use((req, res, next) => {
    console.log(req)
    next()
})

const userRouter = require ('./routes/userRoutes')
const requestRouter = require ('./routes/requestRoutes')
const holidayVoucherRouter = require ('./routes/holidayVoucherRoutes')
const leisureRouter = require ('./routes/leisureRoutes')
const rentalRouter = require ('./routes/rentalRoutes')

app.use('/api/users', userRouter)
app.use('/api/requests', requestRouter)
app.use('/api/holidays', holidayVoucherRouter)
app.use('/api/leisures', leisureRouter)
app.use('/api/rentals', rentalRouter)

app.use('/uploadedFiles', express.static(__dirname + '/uploadedFiles'));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})