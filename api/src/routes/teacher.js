const express = require('express');
const router = express.Router();
const teacherCtrl = require('../controllers/teacher');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/signup',teacherCtrl.signup);
router.post('/login',teacherCtrl.login);
router.get('/get/:id',teacherCtrl.getTeacher);
router.put('/update/:id',auth , multer, teacherCtrl.updateTeacher);
router.get('/getByUsername/:username',auth,teacherCtrl.getTeacherByUsername);
router.get('/',auth,teacherCtrl.getAll);
router.delete('/delete/:id',auth,teacherCtrl.deleteTeacher);

module.exports = router;