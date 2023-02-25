const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = "PRONAV123";

const protect = (req, res,next) => {
    
    try{
 console.log(123);
 console.log("345",req.headers)
 console.log("ok", req.headers.authorization)
  const token = req.headers["authorization"].split(" ")[1];

  console.log("345",token)

  jwt.verify(token, JWT_SECRET_KEY, function (err, decoded) {
    if (err) {
      console.log("12", err);
      res.status(401).send({message:"unauthorized access" ,success:false})


    } else {
      console.log("okk",decoded); 

      req.userId=decoded.userId

      next();
    }
  });

}

catch(err){

    res.status(401).send({ message: "unauthorized access", success: false });
}


};


module.exports=protect