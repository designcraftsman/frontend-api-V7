const express = require('express');
const router = express.Router();
const SessionCtrl = require('../controllers/Session');
const auth = require('../middleware/auth');

router.post('/add', auth ,SessionCtrl.addSession);
router.delete('/delete/:id', auth, SessionCtrl.deleteSession);
router.get('/get/:id', auth, SessionCtrl.getSession);
router.get('/', auth, SessionCtrl.getAllSessions);
router.put('/update/:id', auth, SessionCtrl.updateSession);

module.exports = router;