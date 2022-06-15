const express = require('express');
const router = express.Router();
const authCtrl = require('../Controllers/users');



router.post('/signup', authCtrl.create);

router.post('/login', authCtrl.login)



module.exports = router;