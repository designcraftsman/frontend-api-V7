const pool = require("../database/db");

class Asset{
    constructor(idcourse ,name, type, url,description, size, position, scale, rotation) {
        this.idcourse = idcourse;
        this.name = name;
        this.type = type;
        this.url = url;
        this.description = description;
        this.size = JSON.stringify(size);
        this.position = JSON.stringify(position);
        this.scale = JSON.stringify(scale);
        this.rotation = JSON.stringify(rotation);
    }

    async addAsset() {
        try {
          await pool.query(
            "INSERT INTO asset (\"idCourse\" ,name, type , url , description , size , position, scale , rotation) VALUES ($1, $2, $3 ,$4, $5, $6, $7, $8 , $9)",
            [this.idcourse, this.name, this.type , this.url , this.description , this.size , this.position, this.scale , this.rotation]
          );
          console.log("Asset added");
        } catch (error) {
          throw new Error("Error adding asset");
        }
      }

    static async deleteAsset(id){
        try{
            await pool.query("DELETE FROM asset WHERE \"idAsset\" = $1", [id]);
        }catch(error){
            throw new Error("Error deleting asset");
        }
      }

    static async getAssetsByCourse(idCourse){
        try{
            const response = await pool.query(`
                  SELECT * FROM asset  where  "idCourse" = $1
            `, [idCourse]);
            return response.rows;
        }catch(error){
            throw new Error("Error getting asset");
        }
      }

    static async getAll(){
        try{
            const response = await pool.query(`
              SELECT a.*, c."creationDate",t."firstName",t."lastName" 
              FROM asset a
              JOIN course c ON a."idCourse" = c."idCourse"
              JOIN teacher t ON c."idTeacher" = t."idTeacher"
              ORDER BY a."idAsset" ASC;
              `);
            return response.rows;
        }catch(error){
            throw new Error("Error getting assets");
        }
      }


      static async updateAssets(idCourse, assets) {
        try {
          for (const asset of assets) {
            const { id, position, rotation, scale } = asset;
      
            // Construct JSONB values directly
            const query = `
              UPDATE asset
              SET properties = jsonb_build_object(
                'position', $1::jsonb,
                'rotation', $2::jsonb,
                'scale', $3::jsonb
              )
              WHERE "idAsset" = $4;
            `;
      
            // Execute the query with JSON parameters
            await pool.query(query, [
              JSON.stringify(position),
              JSON.stringify(rotation),
              JSON.stringify(scale),
              id
            ]);
          }
        } catch (error) {
          console.error('Error updating asset:', error.message);
          throw new Error("Error updating asset");
        }
      }
}

module.exports = Asset;