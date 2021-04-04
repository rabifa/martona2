const express = require("express")
const server = express()

// request, response
server.get('/', (req, res) => {
    console.log('enter index')
    return res.send('WORKING!!!')
})

// create server
server.listen(3000, () => console.log('runnig'))

