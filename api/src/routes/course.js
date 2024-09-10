const express = require('express');
const router = express.Router();
const courseCtrl = require('../controllers/course');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/add' ,auth, multer,courseCtrl.addCourse);
router.get('/get/:id',courseCtrl.getCoursesByTeacher);
router.get('/get/course/:id',courseCtrl.getCourseByIdCourse);
router.get('/get/course/editor/:id',courseCtrl.getCourseByIdCourseEditor);
router.get('/',courseCtrl.getAllCourses);
router.delete('/delete/:id',auth,courseCtrl.deleteCourse);
router.put('/update/:id',auth,multer,courseCtrl.updateCourse);
router.post('/enrolledCourses/add',auth,courseCtrl.addEnrolledCourse);
router.get('/enrolledCourses/get/:id',auth,courseCtrl.getEnrolledCourses);
router.delete('/enrolledCourses/delete/:id',auth,courseCtrl.deleteEnrolledCourse);
router.post('/bookMarkedCourses/add',auth,courseCtrl.addBookMarkedCourse);
router.get('/bookMarkedCourses/get/:id',auth,courseCtrl.getBookMarkedCourses);
router.delete('/bookMarkedCourses/delete',auth,courseCtrl.deleteBookMarkedCourse);
router.get('/enrolledCourses/overTime',auth,courseCtrl.getEnrolledCoursesOverTime);
router.get('/enrolledCourses/commitment',auth,courseCtrl.getEnrolledCoursesCommitment);


module.exports = router;