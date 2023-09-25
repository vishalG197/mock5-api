const connection =require('./db');
const express = require('express');
 const cors = require('cors');
 const userroutes = require('./routes/userRoutes');
 const employeeroutes = require('./routes/employeeroutes');
const app = express();
app.use(cors());
app.use(express.json());
app.use("/user",userroutes);
app.use("/employees",employeeroutes)

app.listen(8080,async ()=>{
try {
   await connection;
console.log("Connection established and listening on the http://localhost:8080");
} catch (error) {
   console.log(error.message);
}

})