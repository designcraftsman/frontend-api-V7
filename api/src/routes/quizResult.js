const express = require('express');
const router = express.Router();
const QuizResultCtrl = require('../controllers/QuizResult');
const auth = require('../middleware/auth');

router.post('/add/:userId', auth ,QuizResultCtrl.addQuizResult);
router.delete('/delete/:id', auth, QuizResultCtrl.deleteQuizResult);
router.get('/get/:id', auth, QuizResultCtrl.getQuizResult);
router.get('/', auth, QuizResultCtrl.getAllQuizResults);
router.put('/update/:id', auth, QuizResultCtrl.updateQuizResult);

module.exports = router;