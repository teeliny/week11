import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  last_name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
    },
  
  user_name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  user_password: {
    type: String,
    required: true,
    minlength: 3,
  },
});
const Users = mongoose.model("user", userSchema);

export default Users
  