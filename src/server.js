const express = require("express")
const server = express()

// request, response
server.get('/', (req, res) => {
    console.log('enter index')
    return res.sendFile(__dirname + "/views/index.html")
})

// create server
server.listen(3000, () => console.log('runnig'))

