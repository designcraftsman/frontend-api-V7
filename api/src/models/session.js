const pool = require("../database/db");

class Session {
    constructor(idUser, idCourse, timeSpent, sessionStartTime, sessionEndTime) {
        this.idUser = idUser;
        this.idCourse = idCourse;
        this.timeSpent = timeSpent;
        this.sessionStartTime = sessionStartTime;
        this.sessionEndTime = sessionEndTime;
    }

    async addSession() {
        try {
            await pool.query(
                "INSERT INTO session (iduser, idcourse, timespent, sessionstarttime, sessionendtime) VALUES ($1, $2, $3, $4, $5)",
                [this.idUser, this.idCourse, this.timeSpent, this.sessionStartTime, this.sessionEndTime]
            );
            console.log("Session added");
        } catch (error) {
            throw new Error("Error adding session");
        }
    }

    static async deleteSession(id) {
        try {
            await pool.query("DELETE FROM session WHERE idsession = $1", [id]);
        } catch (error) {
            throw new Error("Error deleting session");
        }
    }

    static async getSession(id) {
        try {
            const response = await pool.query("SELECT * FROM session WHERE idsession = $1", [id]);
            return response.rows[0];
        } catch (error) {
            throw new Error("Error getting session");
        }
    }

    static async getAll() {
        try {
            const response = await pool.query("SELECT * FROM session");
            return response.rows;
        } catch (error) {
            throw new Error("Error getting sessions");
        }
    }

    async updateSession(id) {
        try {
            const fields = {};
            if (this.idUser !== undefined) fields.iduser = this.idUser;
            if (this.idCourse !== undefined) fields.idcourse = this.idCourse;
            if (this.timeSpent !== undefined) fields.timespent = this.timeSpent;
            if (this.sessionStartTime !== undefined) fields.sessionstarttime = this.sessionStartTime;
            if (this.sessionEndTime !== undefined) fields.sessionendtime = this.sessionEndTime;

            if (Object.keys(fields).length === 0) {
                throw new Error("No fields provided for update.");
            }

            const keys = Object.keys(fields);
            const values = Object.values(fields);
            const setClause = keys.map((key, index) => `${key} = $${index + 1}`).join(', ');
            values.push(id); // Add id to values

            const queryText = `UPDATE session SET ${setClause} WHERE idsession = $${values.length} RETURNING *`;
            const result = await pool.query(queryText, values);

            if (result.rowCount === 0) {
                throw new Error("Session not found.");
            }

            return result.rows[0];
        } catch (error) {
            console.error('Error updating session:', error.message);
            throw new Error("Error updating session");
        }
    }
}
// the Session class

const users = [];

function userJoin(id, username, room , userImage) {
  const user = { id, username, room , userImage };
  users.push(user);
  return user;
}

function getCurrentUser(id){
    return users.find(user => user.id === id);
}

function userLeave(id) {
  const index = users.findIndex(user => user.id === id);
  if (index!== -1) return users.splice(index, 1)[0];
}

function getRoomUsers(room){
    return users.filter(user => user.room === room);
}
//Session class end

module.exports ={
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers,
    Session
}


