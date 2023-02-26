const express = require("express");
const Doctors = require("../models/doctorModel");
const router = express.Router();
const Users = require("../models/userModel");




router.get("/getDoctorProfile/:id", async (req, res) => {
  try {

const doctorId=req.params.id


    const getDoctorDetails = await Doctors.findOne({
      userId: doctorId,
    });
    console.log("4222", getDoctorDetails);

    res.status(200).send({
      message: "fetching DoctorData successfull",
      success: true,
      getDoctorDetails
    });
  } catch (err) {
    res
      .status(500)
      .send({ message: "fetching DoctorData failed", err, success: false });
  }
});



router.patch("/getDoctorProfile/:id", async (req, res) => {

  try {
    const doctorId = req.params.id;

    console.log("2244", req.body);
    const data = req.body;

    Doctors.findByIdAndUpdate(doctorId, data, function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        console.log("Updated User : ", docs);
      }
    });

    const updatedDoctor = await Doctors.find({ _id: doctorId });

    res.status(200).send({
      message: "Doctor updated successfully",
      success: true,
      updatedDoctor,
    });
  } catch (err) {
    res
      .status(500)
      .send({ message: "some error occured", success: false, err });
  }


})













module.exports = router;
