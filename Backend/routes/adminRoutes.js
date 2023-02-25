const express = require("express");
const router = express.Router();
const Users = require("../models/userModel");

router.get("/showUserList", async (req, res) => {
  try {
    const showallusers = await Users.find();
    console.log("4222",showallusers)

    res
      .status(200)
      .send({
        message: "fetching userslist successfull",
        success: true,
        showallusers,
      });
  } catch (err) {
    res
      .status(500)
      .send({ message: "fetching userslist failed", err, success: false });
  }
});

router.get("/deleteUsers/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    Users.findByIdAndRemove(userId, function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        console.log("Removed User : ", docs);
      }
    });

    res.status(200).send({
      message: "deleting userslist successfull",
      success: true,
    });
  } catch (err) {
    res
      .status(500)
      .send({ message: "deleting userslist failed", err, success: false });
  }
});



router.patch("/updateUser/:userId", async(req, res, next) => {

    try{
  const userId = req.params.userId;

  console.log("2244",req.body)
  const data=req.body

  Users.findByIdAndUpdate(userId, data, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log("Updated User : ", docs);
    }
  });

  const updatedUser=await Users.find({_id:userId})



  res.status(200).send({ message:"User updated successfully",success:true,updatedUser});

}

catch(err){

    res.status(500).send({message:'some error occured',success:false,err})
}
});




router.get("/users/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

 
    const userDetails=await Users.find({_id:userId})
    
    console.log("cv",userDetails);

    res.status(200).send({
      message: "userDetails fetched successfully",
      success: true,
      userDetails
    });
  } catch (err) {
    res
      .status(500)
      .send({ message: "userDetails fetching failed", err, success: false });
  }
});


router.get('/block/:id',async(req,res)=>{

  try{

  const user_id=req.params.id
  console.log('xz',user_id)

  Users.findByIdAndUpdate(
    user_id,
    {
      isBlocked:true
    },
    function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        console.log("Updated User : ", docs);
      }
    }
  );

  const userDetails = await Users.find({ _id: user_id });
  

    res.status(200).send({ message: "you are blocked",success:true,userDetails });

  }

  catch(err){

    res
      .status(500)
      .send({ message: "error blocking user", success: false, err });

  }

  
})

router.get("/unblock/:id", async(req, res) => {
  


  try{

  const user_id=req.params.id
  console.log('xz',user_id)

  Users.findByIdAndUpdate(
    user_id,
    {
      isBlocked:false
    },
    function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        console.log("Updated User : ", docs);
      }
    }
  );

  const userDetails = await Users.find({ _id: user_id });
  

    res.status(200).send({ message: "you are  unblocked",success:true,userDetails });

  }

  catch(err){

    res
      .status(500)
      .send({ message: "error unblocking user", success: false, err });

  }

});




module.exports = router;
