const Admin = require('../models/admin');

exports.getTotalRows = async (req, res) => {
    try {
      const response = await Admin.getTotalRows();
      res.status(201).json({ message: "Total rows retrieved successfully", response });
    } catch (error) {
      res.status(500).json({ error: "An error occurred while retrieving total rows" });
    }
};

exports.getCoursesCategoriesEnrollment = async (req, res) => {
    try {
      const response = await Admin.getCoursesCategoriesEnrollment();
      res.status(201).json({ message: "Total rows retrieved successfully", response });
    } catch (error) {
      res.status(500).json({ error: "An error occurred while retrieving total rows" });
    }
};