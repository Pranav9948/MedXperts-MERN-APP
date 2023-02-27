const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    // userId: {
    //   type: String,
    //   required: true,
    // },

    firstName: {
      type: String,
      required: true,
    },

    lastName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,  
    },

    address: {
      type: String,
      required: true,
    },

    phoneNumber: {
      type: String,
      required: true,
    },

    ProfileImage: {
      type: String,
      required: true,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },

    feePerConsultation: {
      type: String,
      required: true,
    },

    experience: {
      type: String,
      required: true,
    },

    specialization: {
      type: String,
      required: true,
    },

    DoctorCertificateId: {
      type: String,
      required: true,
    },

    timings: {   
      type: Array,
      required: true,
    },

    status: {
      type: String,
      default: "pending",  
    },
  },

  {
    timestamps: true,
  }
);   

const Doctors = mongoose.model("doctors", doctorSchema);

module.exports = Doctors;