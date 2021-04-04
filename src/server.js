const express = require("express")
const server = express()
const routes = require("./routes")

// anable statics files
server.use(express.static("public"))

// routes
server.use(routes)

// create server
server.listen(3000, () => console.log('runnig'))

