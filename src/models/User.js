import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  googleId: {
    type: String,
    required: false,
  },

  password: {
    type: String,
    required: function () {
      return !this.googleId; // Require password only if not using Google
    },
  },

  phoneNumber: {
    type: Number,
    required: function () {
      return !this.googleId; // Require phoneNumber only if not using Google
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
