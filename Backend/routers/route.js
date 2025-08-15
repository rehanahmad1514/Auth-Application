const express = require('express');
const router = express.Router();


// Importing controllers for handling login and signup requests
const { loginUser } = require('../controller/login');
const { signUpUser } = require('../controller/signup');
const { signUnValidation, loginValidation } = require('../middleware/authValidation');


// Route for user signup
router.post("/signup", signUnValidation, signUpUser);

// Route for user login
router.post("/login", loginValidation, loginUser);

// Export the router to be used in the main app
module.exports = router;
