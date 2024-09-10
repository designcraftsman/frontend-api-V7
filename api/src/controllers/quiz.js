const Quiz = require('../models/quiz');

exports.addQuiz = async (req, res) => {
    try {
        const { idTeacher,idCourse,quizTitle , quizDescription , quizDuration , quizAttempts , questions} = req.body;
        await Quiz.addQuiz(idTeacher, idCourse,quizTitle , quizDescription , quizDuration , quizAttempts , questions);
        res.status(201).json({ message: "Quiz added successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "An error occurred" });
    }
};

exports.getQuizByCourseId = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        const quiz = await Quiz.getQuiz(id);
        res.status(201).json({ message: "Quiz found successfully", quiz : quiz });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "An error occurred" });
    }
};

exports.getAllQuizzes = async (req, res) => {
    try {
        const quizzes = await Quiz.getAll();
        res.status(201).json({ message: "Quizzes found successfully", quizzes });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "An error occurred" });
    }
};

exports.deleteQuiz = async (req, res) => {
    try {
        const { id } = req.params;
        await Quiz.deleteQuiz(id);
        res.status(200).json({ message: "Quiz deleted successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "An error occurred" });
    }
};

exports.updateQuiz = async (req, res) => {
    try {
        const { id } = req.params;
        const { idCourse, idTeacher, description } = req.body;
        const quiz = new Quiz(idCourse, idTeacher, description);
        const response = await quiz.updateQuiz(id);
        res.status(200).json({ message: "Quiz updated successfully", response });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "An error occurred" });
    }
};
