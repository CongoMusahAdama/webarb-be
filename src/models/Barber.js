import mongoose from "mongoose";

const barberSchema = new mongoose.Schema({
  fullName:{
    type: String,
    required: true,
  },

  phoneNumber: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    validate: {
      validator: function(v){
        return /^([\w-]+(?:\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7})$/.test(v);
      },
      message: 'Invalid email formar'
    },
  },

  //TODO: NIA VERIFICATION
  ghanaCardNumber: {
    type: String,
    required: true,
    minlenght: 8,
    maxlenght: 15,
  },

  location: {
    type: String,
    required: true,
  },

  profileImage: {
    type: String,
    required: true,
  },

  yearsOfExperience: {
    type: Number,
    required: true,
  },

  specialization: {
    type: String,
    required: true,
  },

  availability: {
    type: String,
    default: 'yes',
  },

  portfolio: {
    type: [mongoose.Schema.Types.Mixed],
    default: [],
  },
}, { timestamps: true });

const Barber = mongoose.model('Barber', barberSchema);

export default Barber;