const Profile = require('../model/Profile')

module.exports = {
  async index(req, res) {
    return res.render("profile", { profile: await Profile.get()})
  },

  async update(req, res) {
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

    const profile = await Profile.get()
    await Profile.update({
      ...profile,
      ...req.body,
      "value-hour": valueHour
    })

    return res.redirect('/profile')
  }
}