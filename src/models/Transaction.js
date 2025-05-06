import mongoose from "mongoose";
import User from "../models/User.js"

const transactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  amount: {
    type: Number,
    required: true,
  },

  reference: {
    type: String,
    required: true,
    unique: true,
  },

  status:{
    type: String,
    default: "pending", //Modify to use array of pending, rejected or completed
  },

  channel: {
    type: String,
    default: null,
  },
}, {timestamps: true });

const Transaction = mongoose.model("Transaction", transactionSchema);
export default Transaction;

