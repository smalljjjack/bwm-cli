const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {type:String, required: true, unique:true, max:[32, 'invalid username'], min:[4, 'invalid username']},
  email: {type:String, required: true, unique:true, lowercase:true, max:[32, 'invalid email'], min:[4, 'invalid email']},
  password: {type:String, required: true, max:[32, 'invalid password'], min:[4, 'invalid word']},
  rentals: [{type: Schema.Types.ObjectId, ref: 'Rental'}],
  bookings: [{type: Schema.Types.ObjectId, ref: 'Booking'}],
});

userSchema.methods.hasSamePassword = function(requestedPassword) {
  return requestedPassword == this.password;
}

module.exports = mongoose.model('User', userSchema);
