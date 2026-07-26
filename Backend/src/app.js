const express =require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const app =express()

app.use(express.json()) //middleware ,basically it converts JSON into Javascripts objects
app.use(cookieParser())
app.use(cors({
    origin: "https://jobprepai1-rzkd.onrender.com",
    credentials: true
}))

/*require all the routes here*/
const authRouter = require("./routes/auth.route")
const interviewRouter = require("./routes/interview.routes")

/*using all the routes here */
app.use("/api/auth", authRouter)
app.use("/api/interview", interviewRouter )


module.exports = app
