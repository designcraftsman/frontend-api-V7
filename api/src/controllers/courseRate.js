const courseRate = require('../models/courseRate');

exports.addRate = async (req, res) => {
    try {
      const { idCourse, idUser, rate, comment } = req.body;
      const response = await courseRate.addRate(idCourse, idUser, rate, comment);
      res.status(201).json({ message: "Rate added successfully" });
    } catch (error) {
      res.status(500).json({ error: "An error occurred while adding the rate" });
    }
};

exports.getAllCourseRates = async (req,res) => {
  try{
      const {idCourse} = req.params;
      const response =  await courseRate.getAllCourseRates(idCourse);
      res.status(200).json({success:true , response});
  }catch(error){
    res.status(400).json({error:"An error occured while getting course rates"});
  }
}

