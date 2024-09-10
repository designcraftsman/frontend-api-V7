const pool = require("../database/db");
class QuizElement {
    constructor(idQuiz, question, choix1, choix2, choix3, choix4, answer) {
        this.idQuiz = idQuiz;
        this.question = question;
        this.choix1 = choix1;
        this.choix2 = choix2;
        this.choix3 = choix3;
        this.choix4 = choix4;
        this.answer = answer;
    }

    async addQuizElement() {
        try {
            await pool.query(
                "INSERT INTO quizelement (idQuiz, question, choix1, choix2, choix3, choix4, answer) VALUES ($1, $2, $3, $4, $5, $6, $7)",
                [this.idQuiz, this.question, this.choix1, this.choix2, this.choix3, this.choix4, this.answer]
            );
            console.log("QuizElement added");
        } catch (error) {
            throw new Error("Error adding quizElement");
        }
    }

    static async deleteQuizElement(id) {
        try {
            await pool.query("DELETE FROM quizelement WHERE idquizelement = $1", [id]);
        } catch (error) {
            throw new Error("Error deleting quizElement");
        }
    }

    static async getQuizElements(idQuiz) {
        try {
            const response = await pool.query(`SELECT * FROM "quizElement" WHERE "idQuiz" = $1`, [idQuiz]);
            return response.rows;
        } catch (error) {
            throw new Error("Error getting quizElements");
        }
    }

    static async getAll() {
        try {
            const response = await pool.query("SELECT * FROM quizelement");
            return response.rows;
        } catch (error) {
            throw new Error("Error getting quizElements");
        }
    }

    async updateQuizElement(id) {
        try {
            const fields = {};
            if (this.idQuiz !== undefined) fields.idQuiz = this.idQuiz;
            if (this.question !== undefined) fields.question = this.question;
            if (this.choix1 !== undefined) fields.choix1 = this.choix1;
            if (this.choix2 !== undefined) fields.choix2 = this.choix2;
            if (this.choix3 !== undefined) fields.choix3 = this.choix3;
            if (this.choix4 !== undefined) fields.choix4 = this.choix4;
            if (this.answer !== undefined) fields.answer = this.answer;

            if (Object.keys(fields).length === 0) {
                throw new Error("No fields provided for update.");
            }

            const keys = Object.keys(fields);
            const values = Object.values(fields);
            const setClause = keys.map((key, index) => `${key} = $${index + 1}`).join(', ');
            values.push(id); // Add id to values

            const queryText = `UPDATE quizelement SET ${setClause} WHERE idquizelement = $${values.length} RETURNING *`;
            const result = await pool.query(queryText, values);

            if (result.rowCount === 0) {
                throw new Error("QuizElement not found.");
            }

            return result.rows[0];
        } catch (error) {
            console.error('Error updating quizElement:', error.message);
            throw new Error("Error updating quizElement");
        }
    }
}

module.exports = QuizElement;