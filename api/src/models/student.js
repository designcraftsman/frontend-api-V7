const pool = require("../database/db");
const Notification = require("./notification");
class Student {
    constructor(firstName, lastName, dateOfBirth, email, password) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.dateOfBirth = dateOfBirth;
      this.email = email;
      this.password = password;
    }
  
    

    // Static method to get all students
    static async getAll() {
      try {
        const result = await pool.query("SELECT * FROM student");
        return result.rows;
      } catch (error) {
        throw new Error("Error retrieving students");
      }
    }
  
    static async getAllUsernames() {
      try {
        const result = await pool.query("SELECT username FROM student");
        return result.rows.map(row => row.username); // Return only the array of usernames
      } catch (error) {
        throw new Error("Error retrieving students");
      }
    }
    // Static method to find a student by ID
    static async findById(id) {
      try {
        const queryText = `
            SELECT s.*, 
              (SELECT COUNT(*) FROM notification WHERE "userId" = $1 AND "userRole"='student') AS notification_count 
            FROM student s 
            WHERE s."idStudent" = $1;
          `;
          const result = await pool.query(queryText, [id]);
          return result.rows[0];
      } catch (error) {
        throw new Error("Error finding student");
      }
    }

     // Static method to find a student by ID
     static async findByUsername(username) {
      try {
        const queryText = `
            SELECT * 
            FROM student  
            WHERE "username" = $1;
          `;
          const result = await pool.query(queryText, [username]);
          return result.rows[0];
      } catch (error) {
        throw new Error("Error finding student");
      }
    }
    
    static async update(id, imgurl, firstname, lastname, email, birthdate,  gender) {
      try {
        const query = `
          UPDATE student 
          SET 
            image = $1,
            "firstName" = $2, 
            "lastName" = $3, 
            "birthDate" = $4, 
            email = $5, 
            gender = $6 
          WHERE "idStudent" = $7 
          RETURNING *`;
    
        const values = [imgurl, firstname, lastname, birthdate, email,  gender, id];
    
        const updatedStudent = await pool.query(query, values);
        const notification = new Notification("success", "Your profile was updated successfully !", "student",updatedStudent.rows[0].idStudent);
        await notification.addNotification();
        return updatedStudent.rows[0];
      } catch (error) {
        console.error("Error updating student:", error);
        throw new Error("Error updating student");
      }
    }
    
      // Delete student from the database
    static async delete(id) {
      try {
        // Start a transaction
        await pool.query('BEGIN');
      
        // Delete from enrolledcourses table
        await pool.query('DELETE FROM enrolledcourses WHERE "idStudent" = $1', [id]);
        // Delete from enrolledcourses table
        await pool.query('DELETE FROM bookmarkedcourses WHERE "idStudent" = $1', [id]);
        // Delete from quizResult table
        await pool.query('DELETE FROM \"quizResult\" WHERE "idUser" = $1', [id]);
        // Delete from student table
        await pool.query('DELETE FROM student WHERE "idStudent" = $1', [id]);
      
        // Commit the transaction
        await pool.query('COMMIT');
      
        return { message: 'Student and associated enrollments deleted successfully.' };
      } catch (error) {
        // Rollback the transaction in case of an error
        await pool.query('ROLLBACK');
        throw new Error(`Error deleting student and associated enrollments: ${error.message}`);
      }
      
    }




      static async getByCountries(){
        try {
          const query = `
           SELECT 
                country, 
                COUNT(*) AS student_count
            FROM 
                student
            GROUP BY 
                country
            ORDER BY 
                student_count DESC;
          `;
          const results = await pool.query(query);
          return results.rows;
        } catch (error) {
          throw new Error("Error retrieving countries");
        }
      }

      static async getByContinent(){
        try {
          const query = `
           SELECT 
                continent, 
                COUNT(*) AS student_count
            FROM 
                student
            GROUP BY 
                continent
            ORDER BY 
                student_count DESC;
          `;
          const results = await pool.query(query);
          return results.rows;
        } catch (error) {
          throw new Error("Error retrieving continents");
        }
      }

  }


  
  module.exports = Student;
  