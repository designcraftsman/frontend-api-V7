const pool = require("../database/db");

class Notification {
    constructor(type, message, userRole , userId) {
        this.date =  new Date().toISOString().slice(0, 10); 
        this.time =  new Date().toISOString().slice(11, 19);
        this.type = type;
        this.message = message;
        this.userRole = userRole;
        this.userId = userId;
    }

    async addNotification() {
        try {
                 await pool.query(
                "INSERT INTO notification (type, message, \"userRole\" , \"userId\") VALUES ($1, $2, $3 , $4)",
                [this.type, this.message, this.userRole, this.userId]
            );
            console.log("Notification added");
        } catch (error) {
            throw new Error("Error adding notification");
        }
    }

    static async deleteNotification(id) {
        try {
            await pool.query("DELETE FROM notification WHERE idnotification = $1", [id]);
        } catch (error) {
            throw new Error("Error deleting notification");
        }
    }

    static async getNotifications(userId , userRole) {
        try {
            const response = await pool.query(`SELECT * FROM notification
                WHERE \"userId\" = $1 AND \"userRole\" = $2 AND state = 'Delivered' ORDER BY date DESC, time DESC`,
                [userId , userRole]);
            return response.rows;
        } catch (error) {
            throw new Error("Error getting notification");
        }
    }

    static async getAll() {
        try {
            const response = await pool.query("SELECT * FROM notification");
            return response.rows;
        } catch (error) {
            throw new Error("Error getting notifications");
        }
    }

    async updateNotification(id) {
        try {
            const fields = {};
            if (this.type !== undefined) fields.type = this.type;
            if (this.message !== undefined) fields.message = this.message;
            if (this.userRole !== undefined) fields.userRole = this.userRole;

            if (Object.keys(fields).length === 0) {
                throw new Error("No fields provided for update.");
            }

            const keys = Object.keys(fields);
            const values = Object.values(fields);
            const setClause = keys.map((key, index) => `${key} = $${index + 1}`).join(', ');
            values.push(id); // Add id to values

            const queryText = `UPDATE notification SET ${setClause} WHERE idNotification = $${values.length} RETURNING *`;
            const result = await pool.query(queryText, values);

            if (result.rowCount === 0) {
                throw new Error("Notification not found.");
            }

            return result.rows[0];
        } catch (error) {
            console.error('Error updating notification:', error.message);
            throw new Error("Error updating notification");
        }
    }
}

module.exports = Notification;
