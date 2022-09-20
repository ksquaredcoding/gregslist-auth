import BaseController from "../utils/BaseController.js";
import { Auth0Provider } from '@bcwdev/auth0provider';
import { jobsService } from "../services/JobsService.js";

export class JobsController extends BaseController {
  constructor() {
    super('api/jobs')
    this.router
      .get('', this.getJobs)
      .get('/:jobId', this.getJobById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.addJob)
      .put('/:id', this.editJob)
      .delete('/:jobId', this.deleteJob)
  }

  async getJobs(req, res, next) {
    try {
      const jobs = await jobsService.getJobs()
      res.send(jobs)
    } catch (error) {
      next(error)
    }
  }
  async getJobById(req, res, next) {
    try {
      const job = await jobsService.getJobById(req.params.jobId)
      res.send(job)
    } catch (error) {
      next(error)
    }
  }
  async addJob(req, res, next) {
    try {
      const formData = req.body
      formData.jobPosterId = req.userInfo.id
      const job = await jobsService.addJob(formData)
      res.send(job)
    } catch (error) {
      next(error)
    }
  }
  async editJob(req, res, next) {
    try {
      const job = await jobsService.editJob(req.body, req.userInfo, req.params.id)
      res.send(job)
    } catch (error) {
      next(error)
    }
  }
  async deleteJob(req, res, next) {
    try {
      await jobsService.deleteJob(req.params.jobId, req.userInfo)
      res.send('Job Posting Deleted')
    } catch (error) {
      next(error)
    }
  }
}