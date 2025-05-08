import mongoose from "mongoose";

const barberSchema = new mongoose.Schema({

  //linking barber flow to user
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

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
      message: 'Invalid email format'
    },
  },

  //TODO: NIA VERIFICATION
  ghanaCardNumber: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 15,
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

  ghanaCardImage: {
    type: String,
    required: false,
  },

  medicalReport: {
    type: String,
    required: false,
  },

  businessRegistration: {
    type: String,
    required: false,
  },
}, { timestamps: true });

const Barber = mongoose.model('Barber', barberSchema);

export default Barber;