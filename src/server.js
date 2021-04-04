const express = require("express")
const server = express()

// anable statics files
server.use(express.static("public"))

// request, response
server.get('/', (req, res) => {
  return res.sendFile(__dirname + "/views/index.html")
})

// create server
server.listen(3000, () => console.log('runnig'))

