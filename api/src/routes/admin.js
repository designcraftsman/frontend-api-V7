const express = require('express');
const router = express.Router();
const adminCtrl = require('../controllers/admin');
const auth = require('../middleware/auth');

router.get('/totalRows' ,auth,adminCtrl.getTotalRows);
router.get('/coursesCategoriesEnrollment',auth,adminCtrl.getCoursesCategoriesEnrollment);

module.exports = router;