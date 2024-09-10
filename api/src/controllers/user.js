const User = require('../models/user');

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const response = await User.login(email, password);
      res.status(200).json(response);
      console.log(response);
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
};


exports.teacherRegister = async (req, res) => {
    const { firstName, lastName, birthDate, email, password, gender,username,country, continent ,specialization } = req.body;
    console.log(req.body);
    try {
      const teacher = new User(firstName, lastName,birthDate, email, password,  gender , username,country, continent, specialization);
      await teacher.teacherSignup();
      res.status(201).json({ message: 'Teacher registered successfully' , success: true });
    } catch (error) {
      res.status(400).json({ error: error.message , success: false });
    }
};



exports.studentRegister = async (req, res, next) => {
  
      const { firstName, lastName, email, password , birthDate,  gender , username,country, continent} = req.body;
      const student = new User(firstName, lastName, birthDate, email, password , gender , username,country, continent);
      try{
          await student.studentSignup();
          res.status(201).json({
            message: 'Student added successfully!',
            success: true
          });}catch(error){
            res.status(400).json({
              message: 'Error saving student: ' + error.message,
              success: false
            });
          }
      
};