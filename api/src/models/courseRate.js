const pool = require("../database/db");

class courseRate{

    static async addRate(idCourse,idStudent,rate,text){
        try {
            const query = `
            Insert into "courseRating" (
                "idCourse",
                "idStudent",
                rate,
                text
            )
            values (
                $1,
                $2,
                $3,
                $4
            )
            `;
            await pool.query(query, [
                idCourse,
                idStudent,
                rate,
                text
            ]);
        } catch (error) {
            console.log(error.message);
            throw new Error("Error adding rate");
        }
    }

    static async getAllCourseRates(idCourse){
        try{
        const query = `select cr.*, s."firstName",s."lastName",s.image from "courseRating" as cr
                       Join student as s on s."idStudent" = cr."idStudent"  where cr."idCourse"= $1`;
        const response =  await pool.query(query,[idCourse]);
        return response.rows;
        }catch(error){
            console.log(error.message);
            throw new Error ("Error in model");
        }
    }

}

module.exports = courseRate;