const express = require('express')
const routes = express.Router()

// EJS by default understands that the files are inside the views folder, 
// but in the root of the app not inside of another folder
const views = __dirname + "/views/"

const profile = {
  name: "Raphael",
  avatar: "https://avatars.githubusercontent.com/u/30870174?s=400&u=a9266803e7f730a651e86d42d9dd8b20ddbd3826&v=4",
  "monthly-budget": 3000,
  "hours-per-day": 5,
  "days-per-week": 25,
  "vacation-per-year": 8,
}

// request, response
routes.get('/', (req, res) => res.render(views + "index"))
routes.get('/job', (req, res) => res.render(views + "job"))
routes.get('/job/edit', (req, res) => res.render(views + "job-edit"))
routes.get('/profile', (req, res) => res.render(views + "profile", {profile}))


module.exports = routes