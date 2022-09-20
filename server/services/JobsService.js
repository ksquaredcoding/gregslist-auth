import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class JobsService {
  async deleteJob(jobId, userInfo) {
    const job = await this.getJobById(jobId)
    if (userInfo.id != job.jobPosterId) { throw new Forbidden("Don't edit jobs that aren't yours...") }
    await dbContext.Jobs.findByIdAndDelete(job.id)
    return job
  }
  async editJob(jobData, userInfo, id) {
    const job = await this.getJobById(jobData.id || id)
    if (userInfo.id != job.jobPosterId.toString()) { throw new Forbidden("Don't edit jobs that aren't yours...") }

    job.company = jobData.company || job.company
    job.jobTitle = jobData.jobTitle || job.jobTitle
    job.hours = jobData.hours || job.hours
    job.rate = jobData.rate || job.rate
    job.description = jobData.description || job.description

    await job.save()
    return job
  }
  async addJob(formData) {
    const job = await dbContext.Jobs.create(formData)
    return job
  }
  async getJobById(id) {
    const job = dbContext.Jobs.findById(id)
    if (!job) { throw new BadRequest('Bad Id') }
    return job
  }
  async getJobs() {
    const jobs = await dbContext.Jobs.find()
    return jobs
  }

}

export const jobsService = new JobsService()