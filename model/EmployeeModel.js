const mongoose = require('mongoose');

const Schema =mongoose.Schema(

   {
first_name:{type:String,required:true},
last_name:{type:String,required:true},
email:{type:String,required:true},
department:{type:String,required:true},
salary:{type:Number,required:true},
   }
)

const EmployeeModel =mongoose.model("employee",Schema);
module.exports = EmployeeModel;