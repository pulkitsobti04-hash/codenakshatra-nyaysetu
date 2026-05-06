const express = require('express');
const { listLawyers, registerLawyer } = require('../controllers/lawyerController');

const router = express.Router();

router.get('/', listLawyers);
router.post('/', registerLawyer);

module.exports = router;
