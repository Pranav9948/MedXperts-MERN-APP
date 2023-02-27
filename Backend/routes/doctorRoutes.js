const express = require("express");
const Doctors = require("../models/doctorModel");
const router = express.Router();
const Users = require("../models/userModel");




router.get("/getDoctorProfile/:id", async (req, res) => {
  try {

    console.log("888888");
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



router.post("/getDoctorProfile/:id", async (req, res) => {

  try {
    const doctorId = req.params.id;
    console.log("2244",doctorId)

    

    Doctors.findOne({_id:doctorId}, function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        console.log("Resultz : ", docs);
      }
    });

    const datazz = req.body.values;

    console.log("4444",datazz);

    //   Doctors.findByIdAndUpdate(doctorId,datazz, function (err, docs) {
    //   if (err) {
    //     console.log(err);
    //   } else { 
    //     console.log("Updated User : ", docs);
    //   }
    // });



  const updatedDoc = await Doctors.findOneAndUpdate({ _id: doctorId},datazz);

console.log("66666",updatedDoc)

    const updatedDoctor = await Doctors.findOne({ _id: doctorId });
    console.log("777",updatedDoctor);

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
