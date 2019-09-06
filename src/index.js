const express = require('express')

//this will run mongoose.connect command in mongoose.js file
require('./db/mongoose')

const userRouter = require('./routers/users')
const taskRouter = require('./routers/tasks')
 
const app = express()

//used for hosting webap on heroku
const port = process.env.PORT || 3000

//to convert incoming json to an object
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

//start server 
app.listen(port , () => {
    console.log("SERVER IS UP ON PORT " + port)
})
























//npm run dev --> To start server
