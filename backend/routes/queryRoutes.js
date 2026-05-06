const express = require('express');
const { listQueries, saveQuery } = require('../controllers/queryController');

const router = express.Router();

router.get('/', listQueries);
router.post('/', saveQuery);

module.exports = router;
