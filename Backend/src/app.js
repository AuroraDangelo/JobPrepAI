const express =require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const app =express()

app.use(express.json()) //middleware ,basically it converts JSON into Javascripts objects
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials: true
}))

/*require all the routes here*/
const authRouter = require("./routes/auth.route")

/*using all the routes here */
app.use("/api/auth", authRouter)


module.exports = app