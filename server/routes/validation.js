const router = require('express').Router();
const validationCtrl = require('../controllers/validation');

router.get('/username', validationCtrl.validateUsername);

module.exports = router;