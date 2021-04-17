const Database = require('../db/config')

module.exports = {
  async get(){
    const db = await Database()

    const data = await db.all(` SELECT * FROM jobs `)

    await db.close()

    return data.map(job => ({
        id: job.id,
        name: job.name,
        "daily-hours": job.daily_hours,
        "total-hours": job.total_hours,
        created_at: job.created_at
    }))
  },
  update(newJob){
    data = newJob
  },
  async delete(id){
    const db = await Database()

    db.run(`DELETE FROM jobs WHERE id = ${id}`)

    await db.close()
    // data = data.filter(job => Number(job.id) !== Number(id))
  },
  async create(newJob){
    const db = await Database()

    await db.run(`INSERT INTO jobs (
        name,
        daily_hours,
        total_hours,
        created_at
    ) VALUES (
      "${newJob.name}",
      ${newJob["daily-hours"]},
      ${newJob["total-hours"]},
      ${newJob.created_at}
    )`)

    await db.close()
  }
}