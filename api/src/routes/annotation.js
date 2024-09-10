const express = require('express');
const router = express.Router();
const annotationCtrl = require('../controllers/annotation');
const auth = require('../middleware/auth');

router.post('/add' ,auth,annotationCtrl.addAnnotation);
router.get('/get/:id',auth,annotationCtrl.getAnnotation);
router.get('/',auth,annotationCtrl.getAllAnnotations);
router.delete('/delete/:id',auth,annotationCtrl.deleteAnnotation);
router.put('/update/:id',auth,annotationCtrl.updateAnnotation);

module.exports = router;