const router = require('express').Router();

router.use('/pipeline', require('./pipelineRoutes'));

module.exports = router;