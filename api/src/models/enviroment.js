const pool = require("../database/db");

class Enviroment {
    constructor(url, name) {
        this.url = url;
        this.name = name;
    }

    async addEnviroment() {
        try {
            await pool.query(
                "INSERT INTO enviroment (url, name) VALUES ($1, $2)",
                [this.url, this.name]
            );
            console.log("Enviroment added");
        } catch (error) {
            throw new Error("Error adding enviroment");
        }
    }

    static async deleteEnviroment(id) {
        try {
            await pool.query("DELETE FROM enviroment WHERE idenviroment = $1", [id]);
        } catch (error) {
            throw new Error("Error deleting enviroment");
        }
    }

    static async getEnviroment(id) {
        try {
            const response = await pool.query("SELECT * FROM enviroment WHERE idenviroment = $1", [id]);
            return response.rows[0];
        } catch (error) {
            throw new Error("Error getting enviroment");
        }
    }

    static async getAll() {
        try {
            const response = await pool.query("SELECT * FROM enviroment");
            return response.rows;
        } catch (error) {
            throw new Error("Error getting enviroments");
        }
    }

    async updateEnviroment(id) {
        try {
            const fields = {};
            if (this.url !== undefined) fields.url = this.url;
            if (this.name !== undefined) fields.name = this.name;

            if (Object.keys(fields).length === 0) {
                throw new Error("No fields provided for update.");
            }

            const keys = Object.keys(fields);
            const values = Object.values(fields);
            const setClause = keys.map((key, index) => `${key} = $${index + 1}`).join(', ');
            values.push(id); // Add id to values

            const queryText = `UPDATE enviroment SET ${setClause} WHERE idenviroment = $${values.length} RETURNING *`;
            const result = await pool.query(queryText, values);

            if (result.rowCount === 0) {
                throw new Error("Enviroment not found.");
            }

            return result.rows[0];
        } catch (error) {
            console.error('Error updating enviroment:', error.message);
            throw new Error("Error updating enviroment");
        }
    }
}


module.exports = Enviroment;