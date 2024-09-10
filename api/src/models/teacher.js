const pool = require("../database/db");
const bcrypt = require('bcrypt');
const Notification = require('./notification');
const jwt = require("jsonwebtoken");


class Teacher{
    constructor(firstName, lastName, dateOfBirth, email, password , specialization , gender) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.dateOfBirth = dateOfBirth;
      this.email = email;
      this.password = password;
      this.specialization = specialization;
      this.gender = gender;
    }

    async register() {
        try {
          const verifyEmail = await pool.query("SELECT * FROM teacher WHERE email = $1", [this.email]);
          if(verifyEmail.rows.length > 0) {
            throw new Error("Email already exists");
          }else{
           await pool.query(
            "INSERT INTO teacher (\"firstName\", \"lastName\", \"birthDate\", email, password, specialization, gender) VALUES ($1, $2, $3, $4, $5, $6, $7)",
            [this.firstName, this.lastName, this.dateOfBirth, this.email, this.password, this.specialization , this.gender]
          );
          console.log("Teacher added successfully!");
        }
        } catch (error) {
          throw new Error("Error saving teacher");
        }
      }

      static async login(email, password) {
        try {
          const result = await pool.query("SELECT * FROM teacher WHERE email = $1", [email]);
      
          const teacher = result.rows[0];
          if (!teacher) {
            console.error("Teacher not found");
            throw new Error("Teacher not found");
          }
      
          const isValidPassword = await bcrypt.compare(password, teacher.password);
          if (!isValidPassword) {
            console.error("Invalid password");
            throw new Error("Invalid password");
          }
      
          const token = jwt.sign({ id: teacher.idTeacher}, 'TOKEN_SECRET', { expiresIn: '4h' });
  
          return { token: token, id:  teacher.idTeacher , success: true };
        } catch (error) {
          console.error("Login failed:", error);
          if (error.message === "Teacher not found" || error.message === "Invalid password") {
            throw error;
          }
          throw new Error("Login failed");
        }
      }

      static async get(id) {
        try {
          const queryText = `
            SELECT t.*, 
              (SELECT COUNT(*) FROM notification WHERE "userId" = $1 AND "userRole"='teacher') AS notification_count 
            FROM teacher t 
            WHERE t."idTeacher" = $1;
          `;
          const result = await pool.query(queryText, [id]);
          return result.rows[0];
        } catch (error) {
          throw new Error("Error finding teacher or counting notifications");
        }
      }

      // Static method to find a student by ID
     static async findByUsername(username) {
      try {
        const queryText = `
            SELECT * 
            FROM teacher 
            WHERE "username" = $1;
          `;
          const result = await pool.query(queryText, [username]);
          return result.rows[0];
      } catch (error) {
        throw new Error("Error finding teacher");
      }
    }
      

      static async update(id, imgurl, firstname, lastname, email, birthdate, specialisation, gender) {
        try {
          const query = `
            UPDATE teacher 
            SET 
              image = $1,
              "firstName" = $2, 
              "lastName" = $3, 
              "birthDate" = $4, 
              email = $5, 
              specialization = $6, 
              gender = $7 
            WHERE "idTeacher" = $8 
            RETURNING *`;
      
          const values = [imgurl, firstname, lastname, birthdate, email, specialisation, gender, id];
          const updatedTeacher = await pool.query(query, values);
          const notification = new Notification("success", "Your profile was updated successfully !", "teacher",updatedTeacher.rows[0].idTeacher);
          await notification.addNotification();
          return updatedTeacher.rows[0];
        } catch (error) {
          console.error("Error updating teacher:", error);
          throw new Error("Error updating teacher");
        }
      }


      static async getAll() {
        try {
          const query = `
            SELECT *
            FROM teacher
            ORDER BY "idTeacher" DESC;
          `;
          const result = await pool.query(query);
          return result.rows;
        } catch (error) {
          console.error("Error fetching teachers:", error);
          throw new Error("Error fetching teachers");
        }
      }


      static async deleteTeacher(id) {
        try {
            // Start a transaction
            await pool.query('BEGIN');


            // Delete quizElementOptions associated with the teacher's quizzes
            await pool.query(`
              DELETE FROM "quizElementOptions"
              WHERE "idQuizElement" IN (
                  SELECT "idQuizElement"
                  FROM "quizElement"
                  WHERE "idQuiz" IN (
                      SELECT "idQuiz"
                      FROM "quiz"
                      WHERE "idTeacher"= $1 
                  )
              )
          `, [id]);

          // Delete quizElements associated with the teacher's quizzes
          await pool.query(`
              DELETE FROM "quizElement"
              WHERE "idQuiz" IN (
                  SELECT "idQuiz"
                  FROM "quiz"
                  WHERE "idTeacher" = $1
              )
          `, [id]);

          // Delete quizzes associated with the teacher's courses
          await pool.query(`
              DELETE FROM "quizResult"
              WHERE "idQuiz" IN (
                  SELECT "idQuiz"
                  FROM quiz
                  WHERE "idTeacher" = $1
              )
          `, [id]);
          
           // Delete quizzes associated with the teacher's courses
           await pool.query(`
            DELETE FROM quiz
            WHERE "idTeacher" = $1
        `, [id]);
            // Delete assets associated with the teacher's courses
            await pool.query(`
                DELETE FROM asset
                WHERE "idCourse" IN (
                    SELECT "idCourse"
                    FROM course
                    WHERE "idTeacher" = $1
                )
            `, [id]);
    
            // Delete enrolled courses associated with the teacher's courses
            await pool.query(`
                DELETE FROM enrolledcourses
                WHERE "idCourse" IN (
                    SELECT "idCourse"
                    FROM course
                    WHERE "idTeacher" = $1
                )
            `, [id]);
    
            // Delete bookmarked courses associated with the teacher's courses
            await pool.query(`
                DELETE FROM bookmarkedcourses
                WHERE "idCourse" IN (
                    SELECT "idCourse"
                    FROM course
                    WHERE "idTeacher" = $1
                )
            `, [id]);
    
            // Delete the groups created by the teacher
            await pool.query(`
                DELETE FROM groupe
                WHERE "idTeacher" = $1
            `, [id]);
    
            // Delete the courses created by the teacher
            await pool.query(`
                DELETE FROM course
                WHERE "idTeacher" = $1
            `, [id]);

            
    
            // Finally, delete the teacher
            await pool.query(`
                DELETE FROM teacher
                WHERE "idTeacher" = $1
            `, [id]);
    
            // Commit the transaction
            await pool.query('COMMIT');
    
            return { message: 'Teacher and associated data deleted successfully.' };
        } catch (error) {
            // Rollback the transaction in case of an error
            await pool.query('ROLLBACK');
            throw new Error(`Error deleting teacher and associated data: ${error.message}`);
        }
    }
    
      
    
}

module.exports = Teacher;