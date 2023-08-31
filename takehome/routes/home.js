const express = require('express');
const router = express.Router();
const { home, getIndicator } = require('../controllers/home');

router.get('/', home);
router.post('/', getIndicator);

module.exports = router;