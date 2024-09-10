const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');


router.post('/signup/teacher',userCtrl.teacherRegister);
router.post('/signup/student',userCtrl.studentRegister);
router.post('/login',userCtrl.login);


module.exports = router;