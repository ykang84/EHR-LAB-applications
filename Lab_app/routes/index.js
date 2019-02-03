const express = require('express');
const router = express.Router();

const lab_controller = require('../controllers/lab');

router.get('/search', lab_controller.search);
router.post('/search', lab_controller.search_redirect);
router.get('/*', lab_controller.welcome);


module.exports = router;
