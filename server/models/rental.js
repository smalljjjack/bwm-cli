const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rentalSchema = new Schema({
  title: {type: String, required:true, max: [128, 'exceed maxlength']},
  city: {type: String, required:true, lowercase: true},
  street: {type: String, required:true, min: [4, 'too short']},
  category: {type: String, required:true},
  image: {type: String, required:true},
  shared: Boolean,
  description: String,
  dailyRate:{type: Number, required: true},
  createAt:{type: String, default: Date.now},
  bedrooms:Number,
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  bookings: [{type: Schema.Types.ObjectId, ref: 'Booking'}],
});

module.exports = mongoose.model('Rental', rentalSchema);
