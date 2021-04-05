const express = require('express')
const routes = express.Router()

// EJS by default understands that the files are inside the views folder, 
// but in the root of the app not inside of another folder
const views = __dirname + "/views/"

const profile = {
  name: "Raphael",
  avatar: "https://github.com/rabifa.png",
  "monthly-budget": 3000,
  "hours-per-day": 5,
  "days-per-week": 25,
  "vacation-per-year": 8,
}

const jobs = []

// request, response
routes.get('/', (req, res) => res.render(views + "index"))
routes.get('/job', (req, res) => res.render(views + "job"))
routes.post('/job', (req, res) => {
  // req.body receive the form data
  jobs.push(req.body)
  return res.redirect('/')
})
routes.get('/job/edit', (req, res) => res.render(views + "job-edit"))
routes.get('/profile', (req, res) => res.render(views + "profile", {profile}))


module.exports = routes