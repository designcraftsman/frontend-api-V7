const QuizElement = require('../models/quizelement');

exports.addQuizElement = async (req, res) => {
    try {
        const { idQuiz, question, choix1, choix2, choix3, choix4, answer } = req.body;
        const quizElement = new QuizElement(idQuiz, question, choix1, choix2, choix3, choix4, answer);
        await quizElement.addQuizElement();
        res.status(201).json({ message: "QuizElement added successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "An error occurred" });
    }
};

exports.getQuizElements = async (req, res) => {
    try {
        const { idQuiz } = req.params;
        const quizElements = await QuizElement.getQuizElements(idQuiz);
        res.status(201).json({ message: "QuizElement found successfully", quizElements });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "An error occurred" });
    }
};

exports.getAllQuizElements = async (req, res) => {
    try {
        const quizElements = await QuizElement.getAll();
        res.status(201).json({ message: "QuizElements found successfully", quizElements });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "An error occurred" });
    }
};

exports.deleteQuizElement = async (req, res) => {
    try {
        const { id } = req.params;
        await QuizElement.deleteQuizElement(id);
        res.status(200).json({ message: "QuizElement deleted successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "An error occurred" });
    }
};

exports.updateQuizElement = async (req, res) => {
    try {
        const { id } = req.params;
        const { idQuiz, question, choix1, choix2, choix3, choix4, answer } = req.body;
        const quizElement = new QuizElement(idQuiz, question, choix1, choix2, choix3, choix4, answer);
        const response = await quizElement.updateQuizElement(id);
        res.status(200).json({ message: "QuizElement updated successfully", response });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "An error occurred" });
    }
};
