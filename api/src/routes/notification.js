const express = require('express');
const router = express.Router();
const notificationCtrl = require('../controllers/notification');
const auth = require('../middleware/auth');

router.post('/add' ,auth, notificationCtrl.addNotification);
router.get('/get/:userId/:userRole',auth ,notificationCtrl.getNotifications);
router.get('/',auth, notificationCtrl.getAllNotifications);
router.delete('/delete/:id',auth, notificationCtrl.deleteNotification);
router.put('/update/:id',auth, notificationCtrl.updateNotification);

module.exports = router;