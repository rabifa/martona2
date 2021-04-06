const express = require('express')
const routes = express.Router()

// EJS by default understands that the files are inside the views folder, 
// but in the root of the app not inside of another folder
const views = __dirname + "/views/"

const Profile = {
  data: {
    name: "Raphael",
    avatar: "https://github.com/rabifa.png",
    "monthly-budget": 3000,
    "hours-per-day": 5,
    "days-per-week": 25,
    "vacation-per-year": 8,
    "value-hour": 75
  },

  controllers: {
    index(req, res) {
      return res.render(views + "profile", { profile: Profile.data })
    },

    update(req, res) {
      // req.body to receive the form
      const data = req.body

      // define weeks per year
      const weeksPerYear = 52

      // remove weeks from vacarions
      const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12

      // total hours worked er week
      const weekTotalHours = data["hours-per-day"] * data["days-per-week"]

      // total hours worked per mounth
      const mounthlyTotalHours = weekTotalHours * weeksPerMonth

      // value of my hour
      const valueHour = data["value-hour"] = data["monthly-budget"] / mounthlyTotalHours

      Profile.data = {
        ...Profile.data,
        ...req.body,
        "value-hour": valueHour
      }

      return res.redirect('/profile')
    }
  }
  
}

const Job = {
  data: [
    {
      id: 1,
      name: "Pizzaria Guloso",
      "daily-hours": 2,
      "total-hours": 1,
      created_at: Date.now(),
    },
    {
      id: 2,
      name: "OneTwo Project",
      "daily-hours": 3,
      "total-hours": 47,
      created_at: Date.now(),
    }
  ],

  controllers: {
    index(req, res) {
      const updatedJobs = Job.data.map((job) => {
        const remaining = Job.services.remainingDays(job)
        const status = remaining <= 0 ? 'done' : 'progress'
      
        return {
          ...job,
          remaining,
          status,
          budget: Job.services.calculateBudget(job, Profile.data["value-hour"])
        }
      })
      
      return res.render(views + "index", {jobs: updatedJobs})
    },

    create(req, res) {
      return res.render(views + "job")
    },

    save(req, res) {
      // req.body receive the form data -> { name: '', 'daily-hours': '', 'total-hours': ''}
      const lastId = Job.data[Job.data.length - 1]?.id || 1

      Job.data.push({
        id: lastId + 1,
        name: req.body.name,
        "daily-hours": req.body["daily-hours"],
        "total-hours": req.body["total-hours"],
        created_at: Date.now()
      })
      return res.redirect('/')
    },

    show(req, res) {
      const jobId = req.params.id

      const job = Job.data.find(job => Number(job.id) === Number(jobId))

      if(!job){
        return res.send('Job not found')
      }

      job.budget = Job.services.calculateBudget(job, Profile.data["value-hour"])

      return res.render(views + "job-edit", {job})
      },

    update(req, res) {
      const jobId = req.params.id

      const job = Job.data.find(job => Number(job.id) === Number(jobId))

      if(!job){
        return res.send('Job not found')
      }

      const updatedJob = {
        ...job,
        name: req.body.name,
        "total-hours": req.body["total-hours"],
        "daily-hours": req.body["daily-hours"],
      }

      Job.data = Job.data.map(job => {
        
        if(Number(job.id) === Number(jobId)){
          job = updatedJob
        }

        return job
      })

      return res.redirect('/job/' + jobId)
    }

  },

  services: {
    remainingDays(job){
      //calculation of the remaining days to deliver the job
      const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed()
      
      const createdDate = new Date(job.created_at)
      const dueDay = createdDate.getDate() + Number(remainingDays)
      const dueDate = createdDate.setDate(dueDay)
    
      const timeDiffInMs = dueDate - Date.now()
    
      //transform ms in days
      const DayinMs = 1000 * 60 * 60 * 24
      const dayDiff = Math.floor(timeDiffInMs / DayinMs)
    
      // lack X days
      return dayDiff
    },

    calculateBudget: (job, valueHour) => valueHour * job["total-hours"]
  }
}

// request, response
routes.get('/', Job.controllers.index)
routes.get('/job', Job.controllers.create)
routes.post('/job', Job.controllers.save)
routes.get('/job/:id', Job.controllers.show)
routes.post('/job/:id', Job.controllers.update)
routes.get('/profile', Profile.controllers.index)
routes.post('/profile', Profile.controllers.update)


module.exports = routes