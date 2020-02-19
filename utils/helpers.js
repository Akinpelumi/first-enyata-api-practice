import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const { SECRET='secret' } = process.env;
class Helper{
 static hashPassword(plainPassword){
    return bcrypt.hash(plainPassword, 10);
 }

 static comparePassword(plainPassword, hash){
     return bcrypt.compare(plainPassword, hash);
 }
 
 static generateToken(payload, expiresIn='2h'){
     return jwt.sign(payload, SECRET, { expiresIn })
 }

 static verifyToken(token){
        return jwt.verify(token, SECRET);
 }

 static checkAuthorizationToken(authorization){
    let bearerToken = null;
    if(authorization){
        const token = authorization.split(' ')[1];
        bearerToken = token || authorization;
    }
    return bearerToken;
 }

 static checkToken(req) {
    const { headers: { authorization } } = req;
    const bearerToken = Helper.checkAuthorizationToken(authorization);
    return (
        bearerToken || req.headers['x-access-token'] || req.headers.token || req.body.token
    );
 }
}

export default Helper;
