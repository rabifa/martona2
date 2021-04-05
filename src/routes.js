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
  "vacation-per-year": 8
}

const jobs = [
  {
    id: 1,
    name: "Pizzaria Guloso",
    "daily-hours": 2,
    "total-hours": 60,
    created_at: Date.now()
  },
  {
    id: 2,
    name: "OneTwo Project",
    "daily-hours": 3,
    "total-hours": 47,
    created_at: Date.now()
  }]

// request, response
routes.get('/', (req, res) => res.render(views + "index", {jobs}))
routes.get('/job', (req, res) => res.render(views + "job"))
routes.post('/job', (req, res) => {
  // req.body receive the form data -> { name: '', 'daily-hours': '', 'total-hours': ''}
  const lastId = jobs[jobs.length - 1]?.id || 1

  jobs.push({
    id: lastId + 1,
    name: req.body.name,
    "daily-hours": req.body["daily-hours"],
    "total-hours": req.body["total-hours"],
    created_at: Date.now()
  })
  return res.redirect('/')
})
routes.get('/job/edit', (req, res) => res.render(views + "job-edit"))
routes.get('/profile', (req, res) => res.render(views + "profile", {profile}))


module.exports = routes