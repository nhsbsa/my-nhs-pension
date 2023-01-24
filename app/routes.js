// External dependencies
const express = require('express');

const router = express.Router();

// Add your routes here - above the module.exports line

router.use('/v_001/sandbox/registration/002', require('./views/v_001/sandbox/registration/002/_routes'));
router.use('/v_001/sandbox/registration/002/registration', require('./views/v_001/sandbox/registration/002/_routes'));

module.exports = router;