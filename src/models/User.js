import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  googleId: {
    type: String,
    required: false,
  },

  password: {
    type: String,
    required: function () {
      return !this.googleId;
    },
  },

  phoneNumber: {
    type: Number,
    required: function () {
      return !this.googleId;
    },
  },

  role: {
    type: String,
    enum: ['user', 'barber', 'admin'],
    default: 'user',
  },

  refreshToken: {
    type: String,
  },

}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;
