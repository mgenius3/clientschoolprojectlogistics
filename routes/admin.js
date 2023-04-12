const verifyToken = require('../middleware/auth');
const router = require('express').Router();

const {
  getAllPackages: getAllLogisticsPackages,
  packageStatusUpdate,
} = require('../controller/logistics');

router.use(verifyToken);
router.get('/logistics', getAllLogisticsPackages);
router.patch('/logistics/update_status', packageStatusUpdate);

module.exports = router;
