const pool = require("../database/db");
const Notification = require('./notification');

class Course {
    constructor(idTeacher, name, description, category, idEnvironment, privacy, coursePDF, video, previewImage,skillLevel,gainedSkills,prerequesites, assets) {
        this.idTeacher = idTeacher;
        this.name = name;
        this.description = description;
        this.category = category;
        this.idEnvironment = idEnvironment;
        this.privacy = privacy;
        this.coursePDF = coursePDF;
        this.video = video;
        this.previewImage = previewImage;
        this.skillLevel = skillLevel;
        this.gainedSkills = JSON.stringify(gainedSkills);
        this.prerequesites = JSON.stringify(prerequesites);
        this.assets = Array.isArray(assets) ? assets : [];
        this.creationDate = new Date().toISOString().slice(0, 10); // current date in YYYY-MM-DD format
        this.creationTime = new Date().toISOString().slice(11, 19); // current time in HH:MM:SS format
        this.maxVisitors = 10; // or any default value
        this.cordinates = JSON.stringify(["0","0","0"]); // or any default value
    }

    async addCourse() {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');

            // Insert the course into the course table
            const courseResult = await client.query(
                "INSERT INTO course (\"idEnvironnement\", \"idTeacher\", name, category,\"creationDate\", \"creationTime\", description, \"maxVisitors\",  privacy, \"coursepdf\", video, \"previewimage\" , \"gainedSkills\",\"skillLevel\",prerequisites) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11 , $12 , $13 ,$14 , $15) RETURNING \"idCourse\"",
                [this.idEnvironment, this.idTeacher, this.name, this.category ,this.creationDate , this.creationTime, this.description, this.maxVisitors,  this.privacy, this.coursePDF, this.video, this.previewImage , this.gainedSkills , this.skillLevel , this.prerequesites]
            );
            const courseId = courseResult.rows[0].idCourse;
            // Insert assets into the asset table
            for (let asset of this.assets) {
                await client.query(
                    "INSERT INTO asset (\"idCourse\", name, type, url, description, size, position, scale, rotation) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
                    [courseId, asset.name, asset.type, asset.fileUrl, "None", this.cordinates,this.cordinates, this.cordinates, this.cordinates]
                );
            }
            const notification = new Notification("success", "New course created successfully !", "teacher",this.idTeacher);
            await notification.addNotification();
            await client.query('COMMIT');
            console.log("Course and assets added successfully");
            return courseId;
        } catch (error) {
            await client.query('ROLLBACK');
            console.error("Error adding course and assets:", error.message);
        } finally {
            client.release();
        }
    }

    static async deleteCourse(idCourse) {
        try {
            // Start a transaction
            await pool.query('BEGIN');
    
            // Delete quizElementOptions associated with the course's quizzes
            await pool.query(`
                DELETE FROM "quizElementOptions"
                WHERE "idQuizElement" IN (
                    SELECT "idQuizElement"
                    FROM "quizElement"
                    WHERE "idQuiz" IN (
                        SELECT "idQuiz"
                        FROM "quiz"
                        WHERE "idCourse" = $1
                    )
                )
            `, [idCourse]);
    
            // Delete quizElements associated with the course's quizzes
            await pool.query(`
                DELETE FROM "quizElement"
                WHERE "idQuiz" IN (
                    SELECT "idQuiz"
                    FROM "quiz"
                    WHERE "idCourse" = $1
                )
            `, [idCourse]);
    
            // Delete quizResults associated with the course's quizzes
            await pool.query(`
                DELETE FROM "quizResult"
                WHERE "idQuiz" IN (
                    SELECT "idQuiz"
                    FROM "quiz"
                    WHERE "idCourse" = $1
                )
            `, [idCourse]);
    
            // Delete quizzes associated with the course
            await pool.query(`
                DELETE FROM "quiz"
                WHERE "idCourse" = $1
            `, [idCourse]);
    
            // Delete assets associated with the course
            await pool.query(`
                DELETE FROM "asset"
                WHERE "idCourse" = $1
            `, [idCourse]);
    
            // Delete enrolled courses associated with the course
            await pool.query(`
                DELETE FROM "enrolledcourses"
                WHERE "idCourse" = $1
            `, [idCourse]);
    
            // Delete bookmarked courses associated with the course
            await pool.query(`
                DELETE FROM "bookmarkedcourses"
                WHERE "idCourse" = $1
            `, [idCourse]);
    
            // Finally, delete the course
            const result = await pool.query(`
                DELETE FROM "course"
                WHERE "idCourse" = $1 
            `, [idCourse]);
    
           
            // Commit the transaction
            await pool.query('COMMIT');
    
            return { message: 'Course and associated data deleted successfully.' };
        } catch (error) {
            // Rollback the transaction in case of an error
            await pool.query('ROLLBACK');
            throw new Error(`Error deleting course and associated data: ${error.message}`);
        }
    }
    

    static async getCoursesByTeacher(idTeacher) {
        try {
            const query = `
                SELECT 
                c.*, 
                t."firstName", 
                t."lastName",
                t."image" 
                FROM course c
                JOIN teacher t ON c."idTeacher" = t."idTeacher"
                WHERE c."idTeacher" = $1
            `;
            const response = await pool.query(query, [idTeacher]);
            return response.rows;
        } catch (error) {
            throw new Error("Error getting courses by teacher");
        }
    }
    

    static async getCourseByIdCourse(idCourse) {
        try {
            const query = `
                SELECT 
                c.*, 
                t."firstName", 
                t."lastName",
                t."image" 
                FROM course c
                JOIN teacher t ON c."idTeacher" = t."idTeacher"
                WHERE c."idCourse" = $1
            `;
            const response = await pool.query(query, [idCourse]);
            return response.rows[0];
        } catch (error) {
            throw new Error("Error getting course by id");
        }
    }

    static async getCourseByIdCourseEditor(idCourse) {
        try {
            const query = `
                SELECT 
                *    
                FROM course 
                WHERE "idCourse" = $1
            `;
            const response = await pool.query(query, [idCourse]);
            return response.rows[0];
        } catch (error) {
            throw new Error("Error getting course by id");
        }
    }
    

    static async getAll() {
        try {
            const query = `
                SELECT 
                c.*, 
                t."firstName", 
				t."lastName",
                t."image" 
            FROM course c
            JOIN teacher t ON c."idTeacher" = t."idTeacher" 
            `;
            const response = await pool.query(query);
            return response.rows;
        } catch (error) {
            throw new Error("Error getting courses");
        }
    }

    static async updateCourse(id,name,privacy,category,image, description) {
        try {
            await pool.query (`UPDATE course SET
             name = $1,
             privacy = $2,
             category = $3,
             description = $4,
             previewimage = $5
             WHERE \"idCourse\" = $6 `
            ,[name,privacy,category,description,image,id]);
            return ({ message: "Course updated" , success: true });
        } catch (error) {
            console.error('Error updating course:', error.message);
        }
    }


    static async addEnrolledCourse(idCourse,idStudent){
        try {
            await pool.query("INSERT INTO enrolledcourses (\"idStudent\", \"idCourse\") VALUES ($1, $2)", [idStudent, idCourse]);
            console.log("Course added");
            return ({ message: "Course added" , success: true });
        } catch (error) {
            throw new Error("Error adding course");
        }
    }

    static async getEnrolledCourses(idStudent) {
        try {
            const query = `
                SELECT 
                c.*, 
                t."firstName", 
				t."lastName",
                t."image" -- Assuming "teacherProfile" is the column for the image URL
            FROM enrolledCourses ec
            JOIN course c ON ec."idCourse" = c."idCourse"
            JOIN teacher t ON c."idTeacher" = t."idTeacher" -- Adjust column names as needed
            WHERE ec."idStudent" = $1
            `;
            const response = await pool.query(query, [idStudent]);
            return response.rows;
        } catch (error) {
            throw new Error("Error getting enrolled courses");
        }
    }
    

    static async deleteEnrolledCourse(idStudent, idCourse){
        try {
            await pool.query("DELETE FROM enrolledcourses WHERE \"idStudent\" = $1 AND \"idCourse\" = $2", [idStudent, idCourse]);
            console.log("Course deleted");
            return ({ message: "Course deleted" , success: true });
        } catch (error) {
            throw new Error("Error deleting course");
        }
    }


    static async addBookMarkedCourse(idCourse,idStudent){
        try {
            await pool.query("INSERT INTO bookmarkedcourses (\"idCourse\", \"idStudent\") VALUES ($1, $2)", [idCourse, idStudent]);
            console.log("Course added");
            return ({ message: "Course added" , success: true });
        } catch (error) {
            throw new Error("Error adding course");
        }
    }

    static async getBookMarkedCourses(idStudent){
        try {
            const query = `
                SELECT 
                c.*, 
                t."firstName", 
				t."lastName",
                t."image" 
            FROM bookmarkedcourses bmc
            JOIN course c ON bmc."idCourse" = c."idCourse"
            JOIN teacher t ON c."idTeacher" = t."idTeacher" 
            WHERE bmc."idStudent" = $1
            `;
            const response = await pool.query(query, [idStudent]);
            return response.rows;
        } catch (error) {
            throw new Error("Error getting courses");
        }
    }


    static async deleteBookMarkedCourse(idStudent, idCourse){
        try {
            await pool.query("DELETE FROM bookmarkedcourses WHERE \"idStudent\" = $1 AND \"idCourse\" = $2", [idStudent, idCourse]);
            console.log("Course deleted");
            return ({ message: "Course deleted" , success: true });
        } catch (error) {
            throw new Error("Error deleting course");
        }
    }

    static async getEnrolledCoursesOverTime(){
        try {
            const query = `
            SELECT 
                TO_CHAR("enrollmentDate", 'Month') AS month,
                COUNT(*) AS enrolledcourses
            FROM 
                enrolledcourses
            GROUP BY 
                TO_CHAR("enrollmentDate", 'Month'),
                EXTRACT(MONTH FROM "enrollmentDate")
            ORDER BY 
                EXTRACT(MONTH FROM "enrollmentDate");

            `;
            const response = await pool.query(query);
            return response.rows;
        } catch (error) {
            throw new Error("Error getting courses");
        }
    }


    static async getEnrolledCoursesCommitment(){
        try {
            const query = `
            SELECT
                COUNT(*) FILTER (WHERE status = 'complete') AS complete,
                COUNT(*) FILTER (WHERE status = 'audit') AS audit,
                COUNT(*) FILTER (WHERE status = 'uncommitted') AS uncommitted
            FROM enrolledcourses;

            `;
            const response = await pool.query(query);
            return response.rows[0];
        } catch (error) {
            throw new Error("Error getting courses");
        }
    }
}

module.exports = Course;
