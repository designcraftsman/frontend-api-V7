const pool = require("../database/db");
class Quiz {
    constructor(idCourse, idTeacher) {
        this.idCourse = idCourse;
        this.idTeacher = idTeacher;
    }

    static async addQuiz(idTeacher, idCourse,quizTitle , description , quizDuration , quizAttempts , questions) {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');

            // Insert the course into the course table
            const queryResult = await client.query(
                "INSERT INTO quiz ( \"idTeacher\",  \"idCourse\", title, description, duration,  attempts) VALUES ($1, $2, $3, $4, $5, $6) RETURNING \"idQuiz\"",
                [idTeacher, idCourse,quizTitle , description , quizDuration , quizAttempts ]
            );
            const quizId = queryResult.rows[0].idQuiz;
            // Insert assets into the asset table
            for (let question of questions) {
                const quizElement = await client.query(
                    "INSERT INTO \"quizElement\" (\"idQuiz\", question, \"helperText\") VALUES ($1, $2, $3) RETURNING \"idQuizElement\"",
                    [quizId, question.questionText , question.helperText]
                );
                const idQuizElement = quizElement.rows[0].idQuizElement;
                for (let option of question.answerOptions) {
                    await client.query(
                        "INSERT INTO \"quizElementOptions\" (\"idQuizElement\", \"optionText\" , \"isCorrect\") VALUES ($1, $2 , $3)",
                        [idQuizElement, option.text , option.isCorrect]
                    );
                }
            }
            await client.query('COMMIT');
            console.log("Quiz added successfully");
        } catch (error) {
            await client.query('ROLLBACK');
            console.error("Error adding quiz and options:", error.message);
        } finally {
            client.release();
        }
    }

    static async deleteQuiz(id) {
        try {
            await pool.query("DELETE FROM quiz WHERE idquiz = $1", [id]);
        } catch (error) {
            throw new Error("Error deleting quiz");
        }
    }

    static async getQuiz(courseId) {
        try {
            const response = await pool.query(`
                SELECT * from quiz where "idCourse" = $1
            `, [courseId]);
            return response.rows[0];
        } catch (error) {
            throw new Error("Error getting quiz");
        }
    }        

    static async getAll() {
        try {
            const response = await pool.query("SELECT * FROM quiz");
            return response.rows;
        } catch (error) {
            throw new Error("Error getting quizzes");
        }
    }

    async updateQuiz(id) {
        try {
            const fields = {};
            if (this.idCourse !== undefined) fields.idCourse = this.idCourse;
            if (this.idTeacher !== undefined) fields.idTeacher = this.idTeacher;

            if (Object.keys(fields).length === 0) {
                throw new Error("No fields provided for update.");
            }

            const keys = Object.keys(fields);
            const values = Object.values(fields);
            const setClause = keys.map((key, index) => `${key} = $${index + 1}`).join(', ');
            values.push(id); // Add id to values

            const queryText = `UPDATE quiz SET ${setClause} WHERE idquiz = $${values.length} RETURNING *`;
            const result = await pool.query(queryText, values);

            if (result.rowCount === 0) {
                throw new Error("Quiz not found.");
            }

            return result.rows[0];
        } catch (error) {
            console.error('Error updating quiz:', error.message);
            throw new Error("Error updating quiz");
        }
    }
}
module.exports = Quiz;