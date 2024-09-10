const Annotation = require('../models/annotation');

exports.addAnnotation = async (req, res) => {
    try {
        const { idModel, name, description, position } = req.body;
        const annotation = new Annotation(idModel, name, description, position);
        await annotation.addAnnotation();
        res.status(201).json({ message: "Annotation added successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "An error occurred" });
    }
};

exports.getAnnotation = async (req, res) => {
    try {
        const { id } = req.params;
        const annotation = await Annotation.getAnnotation(id);
        res.status(201).json({ message: "Annotation found successfully", annotation });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "An error occurred" });
    }
};

exports.getAllAnnotations = async (req, res) => {
    try {
        const annotations = await Annotation.getAll();
        res.status(201).json({ message: "Annotations found successfully", annotations });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "An error occurred" });
    }
};

exports.deleteAnnotation = async (req, res) => {
    try {
        const { id } = req.params;
        await Annotation.deleteAnnotation(id);
        res.status(200).json({ message: "Annotation deleted successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "An error occurred" });
    }
};

exports.updateAnnotation = async (req, res) => {
    try {
        const { id } = req.params;
        const { idModel, name, description, position } = req.body;
        const annotation = new Annotation(idModel, name, description, position);
        const response = await annotation.updateAnnotation(id);
        res.status(200).json({ message: "Annotation updated successfully", response });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "An error occurred" });
    }
};
