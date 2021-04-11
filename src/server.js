const express = require("express")
const server = express()
const routes = require("./routes")
const path = require("path")

// ejs (tamplete engine) config
server.set('view engine', 'ejs')

// change the location of the views folder
server.set('views', path.join(__dirname, "views"))

// anable statics files
server.use(express.static("public"))

// use req.body
server.use(express.urlencoded( {extended: true}))

// routes
server.use(routes)

// create server
server.listen(3000, () => console.log('runnig'))

