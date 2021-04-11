const express = require('express')
const routes = express.Router()
const ProfileControllers = require('./controllers/ProfileControllers')
const JobControllers = require('./controllers/JobControllers')

// request, response
routes.get('/', JobControllers.index)
routes.get('/job', JobControllers.create)
routes.post('/job', JobControllers.save)
routes.get('/job/:id', JobControllers.show)
routes.post('/job/:id', JobControllers.update)
routes.post('/job/delete/:id', JobControllers.delete)
routes.get('/profile', ProfileControllers.index)
routes.post('/profile', ProfileControllers.update)


module.exports = routes