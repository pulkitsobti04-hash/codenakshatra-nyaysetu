const express = require('express');
const { health, root } = require('../controllers/healthController');

const router = express.Router();

router.get('/', root);
router.get('/api/health', health);

module.exports = router;
