const express =require('express');
const EmployeeModel = require('../model/EmployeeModel')

const router = express.Router();

router.post("/", async (req, res) => {
   try {
   const employee = new EmployeeModel(req.body);
   await employee.save();
res.status(200).json({message:"employee posted succesfully",employee});

   } catch (error) {
      res.status(500).json({ error: error.message });
   }

})

router.get("/", async (req, res) => {
   try {
   const {page,firstName,dept}=req.query;
     const q ={};
     if(firstName){
      q.first_name = firstName;
     }
     if(dept){
      q.department = dept;
     }
const employee = await EmployeeModel.find(q).skip(page*5).limit(5)

res.status(200).json(employee)

   } catch (error) {
      res.status(500).json({ error: error.message });
   }

})


router.patch("/:_id", async (req, res) => {
   try {
      const {_id}=req.params;
   const employee = await EmployeeModel.findById({_id}).updateOne(req.body)
   // console.log(employee)
   
   

   res.status(200).json({ updatedEmployee: employee});
   } catch (error) {
      res.status(500).json({ error: error.message });
   }

})

router.delete("/:_id", async (req, res) => {
   try {
      const employee = await EmployeeModel.findByIdAndDelete(req.params._id);

      res.status(200).json({ updatedEmployee: employee});
   } catch (error) {
      res.status(500).json({ error: error.message });
   }

})

module.exports =router;