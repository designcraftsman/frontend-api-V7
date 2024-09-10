const Asset = require("../models/asset");

exports.addAsset = async (req, res) => {
    try {
      const { idcourse ,name, type , url , description , size , position, scale , rotation } = req.body;
      const asset = new Asset(idcourse ,name, type , url , description , size , position, scale , rotation );
      const response= await asset.addAsset();
      res.status(201).json({ message: "Group added successfully", group: response });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "An error occurred" });
    }
};

exports.getAsset = async (req, res) => {
  try {
    const { id } = req.params; 
    const assets = await Asset.getAsset(id);
    res.status(201).json({ message: "Asset found successfully", assets });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "An error occurred" });
  }
};

exports.getAssetsByCourse = async (req, res) => {
  try {
    const { idCourse } = req.params; 
    const assets = await Asset.getAssetsByCourse(idCourse);
    res.status(201).json({ message: "Asset found successfully", assets });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "An error occurred" });
  }
};

exports.getAllAssets = async (req, res) =>{
  try {
    const assets = await Asset.getAll();
    res.status(201).json({ message: "Assets found successfully", assets });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "An error occurred" });
  }
}

exports.deleteAsset = async (req, res) => {
  try {
    const { id } = req.params;
    await Asset.deleteAsset(id);
    res.status(200).json({ message: "Asset deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "An error occurred" });
  }
};


exports.updateAssets = async (req, res) => {
  try {
    const { idCourse, assets} = req.body;
    console.log(idCourse, assets);
    const response = await Asset.updateAssets(idCourse, assets);
    res.status(200).json({ message: "Asset updated successfully", response });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "An error occurred" });
  }
};

