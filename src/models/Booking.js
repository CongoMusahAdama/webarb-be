import mongoose from "mongoose"; 
import Barber from "./Barber.js"; 
import User from "./User.js"; 

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',   //reference data modeling
    required: true,
  },

  barberId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Barber',
    required: true,
  },

  date: {
    type: Date,
    required: true,
  },

  time: {
    type: String,
    required: true,
  },

  location: {
    type: String,
    required: true,
  },

  style: {
    type: String,
    default: null,
  },

  styleImage: {
    type: String,
    default: null,
  },

  status: {
    type: String,
    enum: ["pending", "accepted", "rejected", "rescheduled"],
    default: "pending",
  },
}, {timestamps: true });

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;