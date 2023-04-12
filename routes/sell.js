const verifyToken = require('../middleware/auth');
const router = require('express').Router();

const {
  receivePackage,
  packageSent,
  getParticularPackage,
  receiveUserPackage,
  payment,
  deleteUserPackage,
} = require('../controller/sell');

router.get('/', receivePackage);
router.get('/:id', verifyToken, getParticularPackage);
router.post('/', verifyToken, packageSent);
router.get('/user/package', verifyToken, receiveUserPackage);
router.get('/pay/:id', verifyToken, payment);
router.delete('/delete/:id', verifyToken, deleteUserPackage);

module.exports = router;
