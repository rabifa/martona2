let data = {
  name: "Raphael",
  avatar: "https://github.com/rabifa.png",
  "monthly-budget": 3000,
  "hours-per-day": 5,
  "days-per-week": 25,
  "vacation-per-year": 8,
  "value-hour": 75
}

module.exports = {
  get() {
    return data
  },

  update(newData) {
    data = newData
  }
}