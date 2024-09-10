const Enviroment = require('../models/enviroment');

exports.addEnviroment = async (req, res) => {
    try {
        const { url, name } = req.body;
        const enviroment = new Enviroment(url, name);
        await enviroment.addEnviroment();
        res.status(201).json({ message: "Enviroment added successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "An error occurred" });
    }
};

exports.getEnviroment = async (req, res) => {
    try {
        const { id } = req.params;
        const enviroment = await Enviroment.getEnviroment(id);
        res.status(201).json({ message: "Enviroment found successfully", enviroment });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "An error occurred" });
    }
};

exports.getAllEnviroments = async (req, res) => {
    try {
        const enviroments = await Enviroment.getAll();
        res.status(201).json({ message: "Enviroments found successfully", enviroments });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "An error occurred" });
    }
};

exports.deleteEnviroment = async (req, res) => {
    try {
        const { id } = req.params;
        await Enviroment.deleteEnviroment(id);
        res.status(200).json({ message: "Enviroment deleted successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "An error occurred" });
    }
};

exports.updateEnviroment = async (req, res) => {
    try {
        const { id } = req.params;
        const { url, name } = req.body;
        const enviroment = new Enviroment(url, name);
        const response = await enviroment.updateEnviroment(id);
        res.status(200).json({ message: "Enviroment updated successfully", response });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "An error occurred" });
    }
};
