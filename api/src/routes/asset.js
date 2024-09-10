const express = require('express');
const router = express.Router();
const assetCtrl = require('../controllers/asset');
const auth = require('../middleware/auth');

router.post('/add' ,auth,assetCtrl.addAsset);
router.get('/get/:id',auth,assetCtrl.getAsset);
router.get('/get/course/:idCourse', assetCtrl.getAssetsByCourse);
router.get('/',auth,assetCtrl.getAllAssets);
router.delete('/delete/:id',auth,assetCtrl.deleteAsset);
router.put('/update',assetCtrl.updateAssets);

module.exports = router;