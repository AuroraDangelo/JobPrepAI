const express =require("express")
const cookieParser = require("cookie-parser")

const app =express()

app.use(express.json()) //middleware ,basically it converts JSON into Javascripts objects
app.use(cookieParser())

/*require all the routes here*/
const authRouter = require("./routes/auth.route")

/*using all the routes here */
app.use("/api/auth", authRouter)


module.exports = app