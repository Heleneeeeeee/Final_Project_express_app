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

app.use('/api/users', userRouter)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})