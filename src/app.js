const express =require("express")

const app =express()

app.use(express.json()) //middleware ,basically it converts JSON into Javascripts objects


module.exports = app