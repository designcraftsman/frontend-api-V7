const pool = require("../database/db");
class QuizResult {
    constructor(idUser, idQuiz, result) {
        this.idUser = idUser;
        this.idQuiz = idQuiz;
        this.result = result;
    }

    static async add(userId, quizId, result) {
        try {
            console.log(userId, quizId, result);
            await pool.query(
                "INSERT INTO \"quizResult\" (\"idUser\", \"idQuiz\", \"result\") VALUES ($1, $2, $3 )",
                [userId, quizId, result]
            );
            console.log("QuizResult added");
        } catch (error) {
            throw new Error("Error adding quizResult");
        }
    
    }

    static async deleteQuizResult(id) {
        try {
            await pool.query("DELETE FROM quizresult WHERE idquizresult = $1", [id]);
        } catch (error) {
            throw new Error("Error deleting quizResult");
        }
    }

    static async getQuizResult(id) {
        try {
            const response = await pool.query("SELECT * FROM quizresult WHERE idquizresult = $1", [id]);
            return response.rows[0];
        } catch (error) {
            throw new Error("Error getting quizResult");
        }
    }

    static async getAll() {
        try {
            const response = await pool.query("SELECT * FROM quizresult");
            return response.rows;
        } catch (error) {
            throw new Error("Error getting quizResults");
        }
    }

    async updateQuizResult(id) {
        try {
            const fields = {};
            if (this.idUser !== undefined) fields.idUser = this.idUser;
            if (this.idQuiz !== undefined) fields.idQuiz = this.idQuiz;
            if (this.result !== undefined) fields.result = this.result;

            if (Object.keys(fields).length === 0) {
                throw new Error("No fields provided for update.");
            }

            const keys = Object.keys(fields);
            const values = Object.values(fields);
            const setClause = keys.map((key, index) => `${key} = $${index + 1}`).join(', ');
            values.push(id); // Add id to values

            const queryText = `UPDATE quizresult SET ${setClause} WHERE idquizresult = $${values.length} RETURNING *`;
            const result = await pool.query(queryText, values);

            if (result.rowCount === 0) {
                throw new Error("QuizResult not found.");
            }

            return result.rows[0];
        } catch (error) {
            console.error('Error updating quizResult:', error.message);
            throw new Error("Error updating quizResult");
        }
    }
}

module.exports = QuizResult;