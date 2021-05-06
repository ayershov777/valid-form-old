const router = require('express').Router();
const usersCtrl = require('../controllers/users');
const { requireAuth } = require('../middleware/auth');

router.get('/', requireAuth, usersCtrl.getAuthedUser);

module.exports = router;