const express = require('express');
const router = express.Router();
var passport = require('passport');
var middleware=require("../middleware/middleware")
const patient_controller = require('../controllers/patient');


router.get('/register', patient_controller.register);
router.get('/login', patient_controller.login);
router.post('/login',
  passport.authenticate('local', {failureRedirect: '/patient/login' }),
  patient_controller.loginPost
);
router.get('/logout',
    function(req, res){
      req.logout();
      res.render ("logoutSuccess");
    });

// routes for searching patient
router.get('/search', middleware.isLoggedIn, patient_controller.searchPatient);
router.post('/search', middleware.isLoggedIn, patient_controller.searchPatient_redirect);

router.get('/ehr/:patientId', patient_controller.searchPatientFromEHRWithId);
router.get('/ehr/:patientId/name/:patientName', patient_controller.searchPatientFromEHRWithIdName);

router.get('/fhir/:patientId', middleware.isLoggedIn, patient_controller.searchPatientFromFHIRWithId);
router.get('/fhir/:patientId/name/:patientName', middleware.isLoggedIn, patient_controller.searchPatientFromFHIRWithIdName);

router.get('/lab/:patientId', middleware.isLoggedIn, patient_controller.searchPatientFromLabWithId);


// routes for saving patient
router.get('/savePatient_ehr', middleware.isLoggedIn, patient_controller.savePatient_ehr);
router.post('/savePatient_ehr', middleware.isLoggedIn, patient_controller.savePatientToEHR);
router.get('/savePatient_fhir', middleware.isLoggedIn, patient_controller.savePatient_fhir);
router.post('/savePatient_fhir', middleware.isLoggedIn, patient_controller.savePatientToFHIR);
router.get('/*', patient_controller.welcome);

module.exports = router;
