module.exports = {
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