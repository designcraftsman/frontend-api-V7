const bcrypt = require('bcrypt');
const Teacher = require('../models/teacher');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then(
      (hash) => {
        const { firstName, lastName, email, password , birthDate, specialization, gender } = req.body;
        const teacher = new Teacher(firstName, lastName, birthDate, email, hash ,specialization, gender);
        teacher.register().then(
          () => {
            res.status(201).json({
              message: 'Teacher added successfully!',
              success: true
            });
          }
        ).catch(
          (error) => {
            res.status(500).json({
              error: error,
              success: false
            });
          }
        );
      }
    );
  };



  exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const response = await Teacher.login(email, password);
      res.status(200).json(response);
      console.log(response);
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  };

  exports.getAll = async (req, res) => {
    try {
      const teachers = await Teacher.getAll();
      res.status(201).json({success:true,teachers});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

  exports.getTeacher = async (req,res)=>{
      const { id } = req.params;
      try{
        const response = await Teacher.get(id);
        res.status(201).json(response);
      }catch( error ){
        res.status(401).json({error: error.message});
      }
  }

  exports.getTeacherByUsername = async (req, res) => {
    try {
      const { username } = req.params;
      const teacher = await Teacher.findByUsername(username);
      res.json(teacher);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "An error occurred" });
    }
  };

  exports.updateTeacher = async (req, res) => {
  const { id } = req.params;
  const { firstname, lastname, email, birthdate, specialisation, gender } = req.body;

   // Initialize file URLs
   let imageUrl = '';
   console.log(req.files); // Check what files are received

   // Handle file uploads
   if (req.files[0]) {
       const url = req.protocol + '://' + req.get('host');
       imageUrl = url + '/assets/images/' + req.files[0].filename;
   }

  try {
    const updatedTeacher = await Teacher.update(id, imageUrl, firstname, lastname, email, birthdate, specialisation, gender);
    res.status(200).json({ message: "Teacher updated successfully", teacher: updatedTeacher, success: true });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      error: error.message
    });
  }
};


exports.deleteTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    await Teacher.deleteTeacher(id);
    res.status(200).json({ message: "Teacher deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "An error occurred" });
  }
};
