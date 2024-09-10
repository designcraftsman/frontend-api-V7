const express = require('express');
const router = express.Router();
const studentCtrl = require('../controllers/student');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/add' ,auth,studentCtrl.addStudent);
router.get('/get/:id',auth,studentCtrl.getStudent);
router.get('/',auth,studentCtrl.getAllStudents);
router.delete('/delete/:id',auth,studentCtrl.deleteStudent);
router.put('/update/:id',auth,multer ,studentCtrl.updateStudent);
router.get('/usernames',auth,studentCtrl.getAllStudentsUsernames);
router.get('/getByUsername/:username',auth,studentCtrl.getStudentByUsername);
router.get('/getByCountries',auth,studentCtrl.getStudentsByCountries);
router.get('/getByContinents',auth,studentCtrl.getStudentsByContinents);

module.exports = router;