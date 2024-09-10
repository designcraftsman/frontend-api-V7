const pool = require("../database/db");
class QuizElementAnswer {
    constructor(idQuizElement, idQuizResult, choix) {
        this.idQuizElement = idQuizElement;
        this.idQuizResult = idQuizResult;
        this.choix = choix;
    }

    async addQuizElementAnswer() {
        try {
            await pool.query(
                "INSERT INTO quizelementanswer (idQuizElement, idQuizResult, choix) VALUES ($1, $2, $3)",
                [this.idQuizElement, this.idQuizResult, this.choix]
            );
            console.log("QuizElementAnswer added");
        } catch (error) {
            throw new Error("Error adding quizElementAnswer");
        }
    }

    static async deleteQuizElementAnswer(id) {
        try {
            await pool.query("DELETE FROM quizelementanswer WHERE idquizelementanswer = $1", [id]);
        } catch (error) {
            throw new Error("Error deleting quizElementAnswer");
        }
    }

    static async getQuizElementAnswer(idQuiz) {
        try {
            const response = await pool.query(`SELECT * FROM "quizElementOptions" WHERE "idQuiz" = $1`, [idQuiz]);
            return response.rows;
        } catch (error) {
            throw new Error("Error getting quizElementOptions");
        }
    }

    static async getAll() {
        try {
            const response = await pool.query("SELECT * FROM quizelementanswer");
            return response.rows;
        } catch (error) {
            throw new Error("Error getting quizElementAnswers");
        }
    }

    async updateQuizElementAnswer(id) {
        try {
            const fields = {};
            if (this.idQuizElement !== undefined) fields.idQuizElement = this.idQuizElement;
            if (this.idQuizResult !== undefined) fields.idQuizResult = this.idQuizResult;
            if (this.choix !== undefined) fields.choix = this.choix;

            if (Object.keys(fields).length === 0) {
                throw new Error("No fields provided for update.");
            }

            const keys = Object.keys(fields);
            const values = Object.values(fields);
            const setClause = keys.map((key, index) => `${key} = $${index + 1}`).join(', ');
            values.push(id); // Add id to values

            const queryText = `UPDATE quizelementanswer SET ${setClause} WHERE idquizelementanswer = $${values.length} RETURNING *`;
            const result = await pool.query(queryText, values);

            if (result.rowCount === 0) {
                throw new Error("QuizElementAnswer not found.");
            }

            return result.rows[0];
        } catch (error) {
            console.error('Error updating quizElementAnswer:', error.message);
            throw new Error("Error updating quizElementAnswer");
        }
    }
}

module.exports = QuizElementAnswer;