const SignUp = require('../model/SignUp');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require("dotenv").config();
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required',
            });
        }

        // Find the user in the database
        const user = await SignUp.findOne({ email });

        // If user not found or password does not match
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({
                success: false,
                message: 'Invalid username or password',
            });
        }
        const payload = {
            id:user._id,
            email:user.email,
        }
        // Optionally, you can generate a JWT token here and send it in the response
        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }
        ); 

        user.token = token;

        // Successful login
        res.status(200).json({
            success: true,
            message: 'Login successful',
            user: {
                id: user._id,
                jwtToken: token,
                email: user.email,
                username: user.username,
            },
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

