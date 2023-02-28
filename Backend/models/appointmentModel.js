const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },

    doctorId: {
      type: String,
      required: true,
    },

    userInfo: {
      type: Object,
      required: true,
    },

    doctorInfo: {
      type: Object,
      required: true,
    },

    status: {
      type: String,
      required: true,
      default: "pending",
    },

    time: {
      type: String,
      required: true,
    },

    date: {
      type: String,
      required: true,
    },
  },

  {
    timestamps: true,
  }
);

const Appointments = mongoose.model("appointment",appointmentSchema);

module.exports = Appointments;
