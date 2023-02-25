const express = require("express");
const router = express.Router();
const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const protect = require("../middleware/authMiddleware");
const Doctors = require("../models/doctorModel");

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
      } else if (User.isBlocked===true ) {
       
          res.status(200).send({ message: "user Blocked...", success: false });

      }
      else{


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

router.post("/apply-for-DoctorAccount", protect, async (req, res) => {
  try {
    console.log("x", req.body);
    const newDoctor = new Doctors({
      ...req.body,
      status: "pending",
      userId: "123",
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


router.get('/deleteAllReadNotifications',async(req,res)=>{

  try{

    

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
       .send({ message: "clear seen message done ", success: true, });
  

  }

  catch(err){

console.log(err)

res.status(500).send("error in clearing seen messages");

  }


})



router.get("/getAdminDetails",async(req,res)=>{

  let adminDetails=await Users.find({isAdmin:true})

  res.json(adminDetails)
});










module.exports = router;
