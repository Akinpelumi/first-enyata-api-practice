const User = require('../models/user');
const jwt = require('jsonwebtoken');
var dotenv = require('dotenv').config();

const setToken = async (req, res, next) => {
    const authorization = req.headers.authorization;
    try {
        if(!authorization) {
            return res.status(401).json ({
                message: 'No Authorization Header found'
            });
        } else {
            const token = authorization.split(' ')[1];
            jwt.verify(token, process.env.SECRET, (err, decoded) => {
                if (err) {
                    return next(err);
                } else {
                    User.find((err) => {
                        if (err) {
                            return next(err); 
                        } else {
                            req.user = decoded;
                            next();
                        }   
                    })
                }
            })
        }
    } catch (err) {
        return next(err)
    }
} 

module.exports = { setToken }
