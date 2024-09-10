const express = require('express');
const router = express.Router();
const courseRateCtrl = require('../controllers/courseRate');
const auth = require('../middleware/auth');


router.post('/add',auth,courseRateCtrl.addRate);
router.get('/course/:idCourse',courseRateCtrl.getAllCourseRates);

module.exports = router;