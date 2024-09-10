const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../database/db');
const Notification = require('./notification');

class User {
  constructor(firstName, lastName, dateOfBirth, email, password, gender, username, country , continent,specialization) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.dateOfBirth = dateOfBirth;
    this.email = email;
    this.password = password;
    this.gender = gender;
    this.username = username;
    this.emailConfirmation = false;
    this.country = country;
    this.continent = continent;
    this.specialization = specialization;
  }

  async studentSignup() {
    try {
      // Check if the email already exists in either the student or teacher table
      const emailCheck = await pool.query(
        "SELECT email FROM student WHERE email = $1 UNION SELECT email FROM teacher WHERE email = $1",
        [this.email]
      );
      if (emailCheck.rows.length > 0) {
        throw new Error("Email already exists in our records");
      }

      // Check if the username already exists in either the student or teacher table
      const usernameCheck = await pool.query(
        "SELECT username FROM student WHERE username = $1 UNION SELECT username FROM teacher WHERE username = $1",
        [this.username]
      );
      if (usernameCheck.rows.length > 0) {
        throw new Error("Username already exists in our records");
      }

      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(this.password, 10);

      const result = await pool.query(
        "INSERT INTO student (\"firstName\", \"lastName\", \"birthDate\", email, password, gender, username, \"emailConfirmation\",country, continent) VALUES ($1, $2, $3, $4, $5, $6, $7, $8 ,$9 ,$10) returning \"idStudent\"",
        [this.firstName, this.lastName, this.dateOfBirth, this.email, hashedPassword, this.gender, this.username, this.emailConfirmation , this.country, this.continent]
      );
      const notification = new Notification("success", "Your account was created successfully ! ", "student",result.rows[0].idStudent);
      await notification.addNotification();

      console.log("Student added successfully!");
    } catch (error) {
      throw new Error("Error saving student: " + error.message);
    }
  }

  async teacherSignup() {
    try {
      // Check if the email already exists in either the student or teacher table
      const emailCheck = await pool.query(
        "SELECT email FROM student WHERE email = $1 UNION SELECT email FROM teacher WHERE email = $1",
        [this.email]
      );
      if (emailCheck.rows.length > 0) {
        throw new Error("Email already exists in our records");
      }

      // Check if the username already exists in either the student or teacher table
      const usernameCheck = await pool.query(
        "SELECT username FROM student WHERE username = $1 UNION SELECT username FROM teacher WHERE username = $1",
        [this.username]
      );
      if (usernameCheck.rows.length > 0) {
        throw new Error("Username already exists in our records");
      }

      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(this.password, 10);

       
      const result = await pool.query(
        "INSERT INTO teacher (\"firstName\", \"lastName\", \"birthDate\", email, password, specialization, gender, username , \"emailConfirmation\" , country , continent) VALUES ($1, $2, $3, $4, $5, $6, $7 , $8 , $9 , $10 ,$11) returning \"idTeacher\"",
        [this.firstName, this.lastName, this.dateOfBirth, this.email, hashedPassword, this.specialization, this.gender, this.username , this.emailConfirmation , this.country , this.continent]
      );
      const notification = new Notification("success", "Your account was created successfully !", "teacher",result.rows[0].idTeacher);
      await notification.addNotification();
      console.log("Teacher added successfully!");
    } catch (error) {
      throw new Error("Error saving teacher: " + error.message);
    }
  }

  static async login(email, password) {
    try {
      // Search in the student table
      const studentResult = await pool.query(
        "SELECT \"idStudent\", password, \"firstName\" , \"lastName\", image FROM student WHERE email = $1",
        [email]
      );

      if (studentResult.rows.length > 0) {
        const student = studentResult.rows[0];
        // Compare the password with bcrypt
        const isMatch = await bcrypt.compare(password, student.password);
        if (isMatch) {
          // Generate JWT
          const token = jwt.sign(
            { id: student.idStudent, role: 'student' },
            'Token_Secret',
            { expiresIn: '24h' }
          );
          return { token, role: 'student', id: student.idStudent, firstName: student.firstName , lastName: student.lastName , image:student.image  , success: true };
        }
      }

      // Search in the teacher table if not found in the student table
      const teacherResult = await pool.query(
        "SELECT \"idTeacher\", password, \"firstName\" , \"lastName\", image FROM teacher WHERE email = $1",
        [email]
      );

      if (teacherResult.rows.length > 0) {
        const teacher = teacherResult.rows[0];
        // Compare the password with bcrypt
        const isMatch = await bcrypt.compare(password, teacher.password);
        if (isMatch) {
          // Generate JWT
          const token = jwt.sign(
            { id: teacher.idTeacher, role: 'teacher', image: teacher.image },
            'Token_Secret',
            { expiresIn: '24h' }
          );
          return { token, role: 'teacher', id: teacher.idTeacher , firstName: teacher.firstName , lastName: teacher.lastName , image:teacher.image , success: true };
        }
      }


      // Search in the teacher table if not found in the student table
      const adminResult = await pool.query(
        "SELECT \"idAdmin\", password, \"firstName\" , \"lastName\" FROM admin WHERE email = $1",
        [email]
      );

      if (adminResult.rows.length > 0) {
        const admin = adminResult.rows[0];
        // Compare the password with bcrypt
        const isMatch = await bcrypt.compare(password, admin.password);
        if (isMatch) {
          // Generate JWT
          const token = jwt.sign(
            { id: admin.idAdmin, role: 'admin' },
            'Token_Secret',
            { expiresIn: '24h' }
          );
          return { token, role: 'admin', id: admin.idAdmin , firstName: admin.firstName , lastName: admin.lastName  , success: true };
        }
      }

      // If no match found in either table
      throw new Error('Invalid email or password');
    } catch (error) {
      throw new Error('Error logging in: ' + error.message);
    }
  }
}

module.exports = User;
