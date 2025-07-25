const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//generate JWT token
const generateToken = (userId) => {
    return jwt.sign({ id : userId}, process.env.JWT_SECRET, {
        expiresIn: '7d',
    });
}

//@desc register a new user
//@route POST /api/auth/register
//@access Public
const registerUser = async (req, res) => {
    try{

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }   
};

//@desc login user
//@route POST /api/auth/login
//@access Public
const loginUser = async (req, res) => { try{
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }   };

//@desc get user profile
//@route GET /api/auth/profile
//@access Private(requies JWT)
const getUserProfile = async (req, res) => { try{
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }   };

//@desc update user profile
//@route PUT /api/auth/profile
//@access Private(requies JWT)
const updateUserProfile = async (req, res) => { try{
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }   };

module.exports = {
    registerUser,loginUser,
    getUserProfile, updateUserProfile};