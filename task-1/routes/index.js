const router = require('express').Router();

router.use('/policies', require('./policies'));

module.exports = router;
