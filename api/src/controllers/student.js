const Student = require("../models/student");

exports.addStudent = async (req, res) => {
    try {
      const { firstName, lastName, birthDate, email, password } = req.body;
      const student = new Student(firstName, lastName, birthDate, email, password);
      const newStudent = await student.save();
      res.status(201).json({ 
        message: "Student added successfully", 
        success: true,
         student: newStudent
         });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({
         error: "An error occurred",
         success: false
         });
    }
};

exports.getAllStudentsUsernames = async (req, res) => {
  try {
    const students = await Student.getAllUsernames();
    res.status(201).json({ message: "Students found successfully", students , success:true});
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "An error occurred" });
  }
};

exports.getAllStudents = async (req, res) => {
    try {
      const students = await Student.getAll();
      res.status(201).json({ message: "Students found successfully", students , success:true});
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "An error occurred" });
    }
  };

  exports.getStudent = async (req, res) => {
    try {
      const { id } = req.params;
      const student = await Student.findById(id);
      res.json(student);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "An error occurred" });
    }
  };

  exports.getStudentByUsername = async (req, res) => {
    try {
      const { username } = req.params;
      const student = await Student.findByUsername(username);
      res.json(student);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "An error occurred" });
    }
  };


  
  exports.updateStudent = async (req, res) => {
    const { id } = req.params;
    const { firstname, lastname, email, birthdate,  gender } = req.body;
      // Initialize file URLs
    let imageUrl = '';
    console.log(req.files); // Check what files are received

    // Handle file uploads
    if (req.files) {
        const url = req.protocol + '://' + req.get('host');
        imageUrl = url + '/assets/images/' + req.files[0].filename;
        console.log(imageUrl);
    }
  
    try {
      const updatedStudent = await Student.update(id, imageUrl, firstname, lastname, email, birthdate,  gender);
      res.status(200).json({ message: "Student updated successfully", student: updatedStudent, success: true });
    } catch (error) {
      console.log(error);
      res.status(401).json({
        error: error.message
      });
    }
  };


  exports.deleteStudent = async (req, res) => {
    try {
      const { id } = req.params;
      console.log(id);
      await Student.delete(id);
      res.status(200).json({ message: "Student deleted successfully" });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "An error occurred" });
    }
  };
  
  exports.getStudentsByCountries = async (req, res) => {
    try {
      const countriesData = await Student.getByCountries();
      res.status(201).json({ message: "Students found successfully", countriesData , success:true});
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "An error occurred" });
    }
  };

  exports.getStudentsByContinents = async (req, res) => {
    try {
      const continentsData = await Student.getByContinent();
      res.status(201).json({ message: "Students found successfully", continentsData , success:true});
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "An error occurred" });
    }
  };