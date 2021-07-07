const express = require('express');
const router = express.Router();
const clinicController = require('../controllers/clinicController');

router
    .route('/clinics')
    .get(clinicController.getClinics);

module.exports = router;