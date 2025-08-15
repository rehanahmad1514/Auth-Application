const bcrypt = require('bcrypt');
const signUp =require('../model/SignUp');
exports.signUpUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if all required fields are provided
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required',
            });
        }
        const user = await signUp.findOne({ email });
        if(user){
            return res.status(400).json({
                success: false,
                message: 'User already exists with this email',
            });
        }
            // hash - password
          const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user instance
        const newUser = new signUp({
            name,
            email,
            password: hashedPassword,
        });

        // Save the user to the database
        await newUser.save();

        // Respond with success message
        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
            },
        });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        }); 
    }
}