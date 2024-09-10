const pool = require("../database/db");

class Admin{

    static async getTotalRows(){
        try {
            const query = `
            SELECT 
                (SELECT COUNT(*) FROM student) as "totalStudents",
                (SELECT COUNT(*) FROM teacher) as "totalTeachers",
                (SELECT COUNT(*) FROM course) as "totalCourses",
                (SELECT COUNT(*) FROM asset) as "totalAssets"
                ;
            `;
            const result = await pool.query(query);
            return result.rows[0];
        } catch (error) {
            throw new Error("Error retrieving total rows");
        }
    }

    static async getCoursesCategoriesEnrollment(){
        try {
            const query = `
            SELECT 
                c.category AS category,
                COUNT(ec."idStudent") AS students
            FROM 
                course c
            JOIN 
                enrolledcourses ec ON c."idCourse" = ec."idCourse"
            GROUP BY 
                c.category;

            `;
            const result = await pool.query(query);
            return result.rows;
        } catch (error) {
            throw new Error("Error retrieving total rows");
        }
    }
}

module.exports = Admin;