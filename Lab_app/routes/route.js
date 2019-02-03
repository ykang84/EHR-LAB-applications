const express = require('express');
const router = express.Router();

const user_controller = require('../controllers/user');

// a simple test url to check that all of our files are communicating correctly.
router.get('/test', user_controller.test);

// User CRUD operations
router.post('/createUser', user_controller.createUser);
router.get('/getUser/:username', user_controller.getUser);
router.put('/updateUser/:username', user_controller.updateUser);
router.delete('/deleteUser/:username', user_controller.deleteUser);

module.exports = router;
