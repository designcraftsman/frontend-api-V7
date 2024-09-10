const express = require('express');
const router = express.Router();
const QuizElementAnswerCtrl = require('../controllers/QuizElementOption');
const auth = require('../middleware/auth');

router.post('/add', auth ,QuizElementAnswerCtrl.addQuizElementAnswer);
router.delete('/delete/:id', auth, QuizElementAnswerCtrl.deleteQuizElementAnswer);
router.get('/get/:idQuiz', auth, QuizElementAnswerCtrl.getQuizElementAnswer);
router.get('/', auth, QuizElementAnswerCtrl.getAllQuizElementAnswers);
router.put('/update/:id', auth, QuizElementAnswerCtrl.updateQuizElementAnswer);

module.exports = router;