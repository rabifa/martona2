const express = require("express")
const server = express()
const routes = require("./routes")

// ejs (tamplete engine) config
server.set('view engine', 'ejs')

// anable statics files
server.use(express.static("public"))

// routes
server.use(routes)

// create server
server.listen(3000, () => console.log('runnig'))

