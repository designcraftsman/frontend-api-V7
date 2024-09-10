const QuizResult = require('../models/quizresult');

exports.addQuizResult = async (req, res) => {
    try {
        const {userId} = req.params;
        const { quizId, result } = req.body;
        const response = await QuizResult.add(userId, quizId, result);
        res.status(201).json({ message: "QuizResult added successfully" , response });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "An error occurred" });
    }
};

exports.getQuizResult = async (req, res) => {
    try {
        const { id } = req.params;
        const quizResult = await QuizResult.getQuizResult(id);
        res.status(201).json({ message: "QuizResult found successfully", quizResult });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "An error occurred" });
    }
};

exports.getAllQuizResults = async (req, res) => {
    try {
        const quizResults = await QuizResult.getAll();
        res.status(201).json({ message: "QuizResults found successfully", quizResults });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "An error occurred" });
    }
};

exports.deleteQuizResult = async (req, res) => {
    try {
        const { id } = req.params;
        await QuizResult.deleteQuizResult(id);
        res.status(200).json({ message: "QuizResult deleted successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "An error occurred" });
    }
};

exports.updateQuizResult = async (req, res) => {
    try {
        const { id } = req.params;
        const { idUser, idQuiz, result } = req.body;
        const quizResult = new QuizResult(idUser, idQuiz, result);
        const response = await quizResult.updateQuizResult(id);
        res.status(200).json({ message: "QuizResult updated successfully", response });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "An error occurred" });
    }
};
