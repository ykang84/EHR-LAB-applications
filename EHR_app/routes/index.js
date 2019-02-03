const express = require('express');
const router = express.Router();

const patient_controller = require('../controllers/patient');

router.get('/search', patient_controller.searchPatient);
router.post('/search', patient_controller.searchPatient_redirect);
router.get('/*', patient_controller.welcome);


module.exports = router;
