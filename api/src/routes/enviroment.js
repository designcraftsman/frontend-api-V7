const express = require('express');
const router = express.Router();
const EnviromentCtrl = require('../controllers/Enviroment');
const auth = require('../middleware/auth');

router.post('/add' ,auth,EnviromentCtrl.addEnviroment);
router.get('/get/:id',auth,EnviromentCtrl.getEnviroment);
router.get('/',auth,EnviromentCtrl.getAllEnviroments);
router.delete('/delete/:id',auth,EnviromentCtrl.deleteEnviroment);
router.put('/update/:id',auth,EnviromentCtrl.updateEnviroment);

module.exports = router;