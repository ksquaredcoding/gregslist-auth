import mongoose from "mongoose";
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId

export const JobSchema = new Schema({
  company: { type: String, required: true, maxLength: 50 },
  jobTitle: { type: String, required: true, maxLength: 50 },
  hours: { type: Number, min: 0, max: 168 },
  rate: { type: Number, min: 0 },
  description: { type: String, required: true, maxLength: 500 },
  jobPosterId: { type: ObjectId, required: true, ref: 'Account' }
}, { timestamps: true, toJSON: { virtuals: true } })

JobSchema.virtual('jobPoster', {
  localField: 'jobPosterId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})

// this.id = data.id
// this.company = data.company
// this.jobTitle = data.jobTitle
// this.hours = data.hours
// this.rate = data.rate
// this.description = data.description