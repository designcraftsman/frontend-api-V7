const express = require('express');
const router = express.Router();
const QuizElementCtrl = require('../controllers/QuizElement');
const auth = require('../middleware/auth');

router.post('/add', auth ,QuizElementCtrl.addQuizElement);
router.delete('/delete/:id', auth, QuizElementCtrl.deleteQuizElement);
router.get('/get/:idQuiz', auth, QuizElementCtrl.getQuizElements);
router.get('/', auth, QuizElementCtrl.getAllQuizElements);
router.put('/update/:id', auth, QuizElementCtrl.updateQuizElement);

module.exports = router;