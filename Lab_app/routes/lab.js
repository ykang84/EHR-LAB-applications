const express = require('express');
const router = express.Router();
var passport = require('passport');
var middleware=require("../middleware/middleware")

const lab_controller = require('../controllers/lab');

// a simple test url to check that all of our files are communicating correctly.
router.get('/register', lab_controller.register);
router.get('/login', lab_controller.login);


// login
router.post('/login',
  passport.authenticate('local', {failureRedirect: '/lab/login' }),
  lab_controller.loginPost);

// logout
router.get('/logout',
    function(req, res){
      console.log ("before logout: req.user: " +req.user);
      req.logout();
      console.log ("before logout: req.user: " +req.user);
      res.render("logoutSuccess",{page: 'logout'});
    });

// save lab results

router.get('/labinput/patient', middleware.isLoggedIn, lab_controller.patientInfo);

router.get ('/inputLabInfo',middleware.isLoggedIn, lab_controller.inputLabInfo);
router.get ('/inputLabInfo_EHR',middleware.isLoggedIn, lab_controller.inputLabInfo_EHR);

router.post ('/inputLabInfo', middleware.isLoggedIn, lab_controller.inputLabInfoPost);

//search
router.get('/search', lab_controller.search);
router.post('/search', lab_controller.search_redirect);
// search patient and lab
router.get('/:labId/patient/:patientId', lab_controller.patent_labs);
 // search patient only
 router.get('/patient/:patientId',   lab_controller.search_patent);
  // search lab only
  router.get('/:labId',    lab_controller.search_lab);

// handle wrong url
router.get('/*', lab_controller.welcome);


router.get('/*', lab_controller.welcome);
module.exports = router;
