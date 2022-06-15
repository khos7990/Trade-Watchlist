const express = require('express')
const router = express.Router();
const watchlistCtrl = require('../Controllers/watchlist');




//PROTECTED ROUTES
router.use(require('../config/auth'));

router.post('/', watchlistCtrl.create)

router.get("/", watchlistCtrl.index)

router.post('/delete', watchlistCtrl.delete)





module.exports = router;