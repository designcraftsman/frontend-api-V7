const express = require('express');
const router = express.Router();
const groupCtrl = require('../controllers/group');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/add', auth, multer,groupCtrl.addGroup);
router.delete('/delete/:id', auth, groupCtrl.deleteGroup);
router.get('/get/:id', auth, groupCtrl.getGroupsByTeacher);
router.get('/', auth, groupCtrl.getAllGroups);
router.put('/update/:id', auth, groupCtrl.updateGroup);
router.get('/getById/:id', auth, groupCtrl.getGroupById);
router.get('/getByStudent/:username', auth, groupCtrl.getGroupsByStudent);

module.exports = router;