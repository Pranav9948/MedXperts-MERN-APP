const express = require("express");
const router = express.Router();
const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const protect = require("../middleware/authMiddleware");
const Doctors = require("../models/doctorModel");
const Appointments = require("../models/appointmentModel");


const JWT_SECRET_KEY = "PRONAV123";

router.post("/register", async (req, res) => {
  try {
    const userExist = await Users.findOne({ email: req.body.email });

    if (userExist) {
      res.status(200).send({ message: "User Already Exist", success: false });
    } else {
      const { password } = req.body;
      const saltRounds = 10;
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashPassword = await bcrypt.hashSync(password, salt);

      req.body.password = hashPassword;

      const newUser = await new Users(req.body);

      const createdUser = await newUser.save();

      if (createdUser) {
        res
          .status(200)
          .send({ message: "user created successfully...", success: true });
      } else {
        res
          .status(200)
          .send({ message: "user creation failed", success: false });
      }
    }
  } catch (err) {
    res
      .status(500)
      .send({ message: "something went wrong", success: false, err });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const User = await Users.findOne({ email: email });

    console.log("mm", User);

    if (!User) {
      res.status(200).send({ message: " incorrect email", success: false });
    } else {
      const isMatch = await bcrypt.compare(password, User.password);

      if (!isMatch) {
        res.status(200).send({ message: "password misMatch", success: false });
      } else if (User.isBlocked === true) {
        res.status(200).send({ message: "user Blocked...", success: false });
      } else {
        console.log("234", JWT_SECRET_KEY);

        const token = jwt.sign({ userId: User._id }, JWT_SECRET_KEY, {
          expiresIn: "2D",
        });

        res
          .status(200)
          .send({ message: "login successfull", success: true, token, User });
      }
    }
  } catch (err) {
    res.status(500).send("some error occcured");
  }
});

router.get("/getUserInfoById", protect, async (req, res) => {
  try {
    console.log("okkkk", req.userId);

    const getUser = await Users.findOne({
      _id: req.userId,
    });

    console.log("hello", getUser);

    res
      .status(200)
      .send({ message: "user details matched", success: true, getUser });
  } catch (err) {
    res.status(500).send({ message: "some error occured..." });
  }
});

router.post("/apply-for-DoctorAccount", async (req, res) => {
  try {
    console.log("224466");
    console.log("x", req.body.values);
    const newDoctor = new Doctors({
      ...req.body.values,
      status: "pending",
      userId: req.userId,
    });

    const doctorCreated = await newDoctor.save();
    console.log("z", doctorCreated);

    const adminDetails = await Users.findOne({ isAdmin: true });

    console.log("m", adminDetails);

    const unseenNotifications = adminDetails.unseenNotifications;

    unseenNotifications.push({
      type: "DoctorApplyRequest",
      message: `${doctorCreated.firstName}  ${doctorCreated.lastName} has applied for doctor account...`,
      data: {
        doctorId: newDoctor._id,
        doctorFullName: `${doctorCreated.firstName}  ${doctorCreated.lastName}`,
      },
      onClickPath: "/admin/approveDoctorRequests",
    });

    const updatedAdmin = await Users.findByIdAndUpdate(adminDetails._id, {
      unseenNotifications,
    });

    console.log("zxc", updatedAdmin);

    res.status(200).send({
      message: "doctor applied successfully",
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "apply for doctor account failed .plz try again",
      success: false,
      error: err,
    });
  }
});

router.get("/markallasread", async (req, res) => {
  try {
    let adminDetails = await Users.find({ isAdmin: true });

    let seenNotifications = adminDetails[0].seenNotifications;

    let unseenNotifications = adminDetails[0].unseenNotifications;

    for (i = 0; i < unseenNotifications.length; i++) {
      seenNotifications.push(unseenNotifications[i]);
    }

    console.log("456", adminDetails[0]._id);

    Users.findByIdAndUpdate(
      adminDetails[0]._id,
      { seenNotifications },
      { new: true }
    )
      .then((updatedExample) => {
        console.log("updated", updatedExample);
      })
      .catch((error) => {
        console.error(error);
      });

    Users.update(
      { isAdmin: true },
      { $set: { unseenNotifications: [] } },
      function (err, affected) {
        console.log("affected: ", affected);
      }
    );

    const updatedAdmin = await Users.find({ isAdmin: true });

    const seen = updatedAdmin.seenNotifications;

    res
      .status(200)
      .send({ message: "mark as read done ", success: true, seen });
  } catch (err) {
    console.log(err);

    res.status(500).send("error in mark as read");
  }
});

router.get("/deleteAllReadNotifications", async (req, res) => {
  try {
    Users.update(
      { isAdmin: true },
      { $set: { seenNotifications: [] } },
      function (err, affected) {
        console.log("affected: ", affected);
      }
    );

    const adminDetails = await Users.find({ isAdmin: true });
    console.log("1", adminDetails[0]);

    res
      .status(200)
      .send({ message: "clear seen message done ", success: true });
  } catch (err) {
    console.log(err);

    res.status(500).send("error in clearing seen messages");
  }
});

router.get("/getAdminDetails", async (req, res) => {
  let adminDetails = await Users.find({ isAdmin: true });

  res.json(adminDetails);
});

// usersSide getallApprovedDoctors

router.get("/getAllApprovedDoctors", async (req, res) => {
  try {
    const getApprovedDoctors = await Doctors.find({ status: "Approved" });

    console.log("8777", getApprovedDoctors);

    res.status(200).send({
      message: "fetching doctor details successfull",
      success: true,
      getApprovedDoctors,
    });
  } catch (err) {
    res
      .status(500)
      .send({ message: "cannot fetch approved doctors", success: false, err });
  }
});

router.get("/getDoctorDetails/:Doctorid", async (req, res) => {
  try {
    const doctorId = req.params.Doctorid;

    const getDoctorDetailz = await Doctors.find({ _id: doctorId });

    console.log("8777", getDoctorDetailz);

    res.status(200).send({
      message: "fetching doctor details successfull",
      success: true,
      getDoctorDetailz,
    });
  } catch (err) {
    res
      .status(500)
      .send({ message: "cannot fetch approved doctors", success: false, err });
  }
});

router.post("/bookAppointmentByUser/:Doctorid", async (req, res) => {
  try {
    const doctorId = req.params.Doctorid;

    const doctorInfo = await Doctors.find({ _id: doctorId });

    console.log("8777", doctorInfo);

    const userId = doctorInfo[0].userIds;

    console.log("3333", userId);

    const userInfo = await Users.findOne({ _id: userId });

    console.log("222", userInfo);

    const time = req.body.selectedTimings;
    const date = req.body.date;
    const status = "pending"
     
    console.log("666",time,date);;

    const newAppointment = await new Appointments({
      userId,
      doctorId,
      userInfo,
      doctorInfo,
      time,
      date,
      status,
    });

     console.log("111");
    await  newAppointment.save();

    console.log("4443");

    const doctorDetails = await Users.findOne({ _id: doctorInfo[0].userIds });

    console.log("m", doctorDetails);

    const unseenNotifications = doctorDetails.unseenNotifications;

    unseenNotifications.push({  
      type: "USER APPOINTMENT BOOKING",
      message: `congragulations..! a appointment has been booked by doctor`,
      data: {
        doctorId: doctorDetails._id,
      },
      onClickPath: "/",
    });

    const updatedDoctor = await Users.findByIdAndUpdate(doctorDetails._id, {
      unseenNotifications,
    });

    console.log("zxc", updatedDoctor);

    res.status(200).send({
      message: "fetching doctor details successfull",
      success: true,
      newAppointment,
      updatedDoctor,
    });
  } catch (err) {
    res
      .status(500)
      .send({ message: "cannot fetch approved doctors", success: false, err });
  }

  

});


router.post('/check-booking-aviliabilty/:id',async(req,res)=>{

  const date=moment(req.body.date, 'DD-MM-YY').toISOString();
  const fromTime = moment(req.body.selectedTimings, "HH:mm")
    .substract(1, 'hours')
    .toISOString();
  const toTime = moment(req.body.selectedTimings, "HH:mm")
    .add(1, 'hours')
    .toISOString();

    const doctorId=req.params.Id;
    const Appointmentz=await Appointments.find({

      doctorId,
      date,
      time:{$gte:fromTime,$lte:toTime},
      status:"approved",

      })

      if(Appointmentz.length>0){

        return res.status(200).send({
          message:"Appointment not aviabile",
          success:false
        })
      }

      else{

        return res.status(200).send({
          message:"appointments unavailable",
          success:true
        })
      } 

})


router.get('/appointmentsByUser/:id',async(req,res)=>{

  try{

  const userid=req.params.userid

  console.log("2444",userid);

  const userAppointments=await Appointments.findById({userid})

  console.log("4333q",userAppointments);

  res.status(200).send({success:true,userAppointments})


  }

  catch(err){

    res.status(500).send({message:"fetching all appointments failed",success:false})
  }

  

})




module.exports = router;
