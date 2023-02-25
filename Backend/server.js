const express=require("express")
const app=express()
 var bodyParser = require('body-parser');
const userRoutes = require("../Backend/routes/userRoutes");
const adminRoutes=require('../Backend/routes/adminRoutes')

require("dotenv").config();

const dbConfig=require('../Backend/config/db')
dbConfig()


 app.use(bodyParser.json({ limit: "50mb" }));

 // parse application/x-www-form-urlencoded
 app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())

app.use('/api/users',userRoutes)
app.use("/api/admin",adminRoutes);




const PORT= process.env.PORT || 5000

app.listen(PORT,()=>{

    console.log("port no",PORT)
    console.log(`app running on port ${PORT}`)
})