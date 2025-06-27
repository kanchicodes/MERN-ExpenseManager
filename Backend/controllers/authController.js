const User = require('../models/User');
const jwt = require('jsonwebtoken');


// generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h', });

};

//resister user
exports.registerUser = async (req, res) => {
    const { fullname, email, password, profileImageUrl } = req.body;

    //validation check for missing fields
    if (!fullname || !email || !password) {
        return res.status(400).json({ message: 'All fields are requaired' });
    }

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        // Create new user
        const user = await User.create({
            fullname,
            email,
            password,
            profileImageUrl,
        });

        // Generate JWT token
        res.status(201).json({
            id: user._id,
            user,
            email: user.email,
            token: generateToken(user._id),
        });

    } catch (error) {
        res.status(500).json({ message: 'Error restering user', error: error.message });
    }
};

//login user
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {

        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        res.status(200).json({
            id: user._id,
            user,
            token: generateToken(user._id),
        });

    }catch (error) {
        res.status(500).json({ message: 'Error logging in user', error: error.message });
    }
}


//get user info
exports.getUserInfo = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');


        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }


        res.status(200).json(user);


    } catch (error) {
        res.status(500).json({ message: 'Error registing user', error: error.message });
    }
}