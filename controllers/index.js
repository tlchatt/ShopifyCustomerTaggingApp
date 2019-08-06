var express = require('express')
  , router = express.Router()

router.use('/customers', require('./customers.js'))
router.use('/users', require('./users.js'))
/** needs be set up to work in router setting instead of app setting
 * router.use('/appAuth', require('./appAuth.js'))
 *  */

module.exports = router