import mongoose from 'mongoose';


// Define the regex for email validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    match: [emailRegex, 'Invalid email format'], // Use regex directly
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: Array,
    default: [],
  },
});
  export const User = mongoose.model('User', UserSchema);