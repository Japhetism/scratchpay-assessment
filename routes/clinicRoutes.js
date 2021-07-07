const express = require('express');
const router = express.Router();
const clinicController = require('../controllers/clinicController');

router
    .route('/clinic')
    .get(clinicController.getClinics);

module.exports = router;