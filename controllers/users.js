const User = require('../models/user');
const dotenv = require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

//New users can signup
const signup = async (req, res, next) => {
    const {
        firstName,
        lastName,
        email,
        password
    } = req.body;
    try {
        const data = await User.findOne({
            email
        });
        if (data) {
            return res.status(401).json({
                message: 'This email address is in use by another user'
            })
        } else {
            const hash = await bcrypt.hash(password, saltRounds)
            const newUser = await new User ({
                firstName,
                lastName,
                email,
                password: hash
            })
            await newUser.save();
            return res.status(201).json({
                message: 'Signup Successful'
            })
        }
    } catch (err) {
        return next(err)
    }
};

//Existing users can login
const login = async (req, res, next) => {
    const {
        email,
        password
    } = req.body;
    try {
        const data = await User.findOne({
            email
        });
        if (!data) {
            return res.status(401).json({
                message: 'User does not exist'
            })
        } else {
            const match = await  bcrypt.compare(password, data.password);
            if (!match) {
                return res.status(401).json({
                    message: 'Invalid login details'
                })
            } else {
                const token = await jwt.sign({
                    userId: data._id
                }, process.env.SECRET, {
                    expiresIn: "1h"
                })
                return res.status(200).json({
                    message: 'Login Successful',
                    data,
                    token
                })
            }
        }
    } catch (err) {
        return next(err)
    }
};
//Logged in users canm logout when through
const logout = async (req, res, next) => {
    const {
        _id
    } = req.body;
    try {
        const data = await User.findOneAndRemove({
            _id
        })
        if (!data) {
            return res.status(401).json({
                message: 'Logout failed'
            })
        } else {
            return res.status(200).json({
                message: 'Logout Successful',

            })
        }
    } catch (err) {
        return next (err)
    }
}

module.exports = { signup, login, logout }