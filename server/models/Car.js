import mongoose from "mongoose";
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId

export const CarSchema = new Schema({
  make: { type: String, required: true, minLength: 3, maxLength: 50 },
  model: { type: String, required: true, maxLength: 50 },
  year: { type: Number, default: 0, min: 0, max: new Date().getFullYear() },
  price: { type: Number, min: 0, required: true },
  description: { type: String, default: '' },
  imgUrl: { type: String, default: 'https://www.autolist.com/assets/listings/default_car.jpg' },
  // Needs relationship from account.js gets objectid from mongoose
  // ................................................V magic string here, name comes from DbContext.js
  sellerId: { type: ObjectId, required: true, ref: 'Account' }
}, { timestamps: true, toJSON: { virtuals: true } })

CarSchema.virtual('seller', {
  localField: 'sellerId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})