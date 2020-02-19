import { UserService, PostService } from '../services';
import {  Helper } from '../utils'; 

const { fetchByEmail } = UserService;
const { getAllOwnPosts } = PostService;
const { comparePassword, checkToken, verifyToken} = Helper;

export default class AuthMiddleware{
    static async validateLoginInfo(req, res, next) {
        const { email, password } = req.body;
        if( !email || !password)
            res.status(401).json({
                status: 'fail',
                message: 'email/password fields are required'
            })
        else{
            const user = await fetchByEmail(email);
            if(!user)
             res.status(401).json({
                 status: 'fail',
                 message: 'invalid email/password'
             })
             else{
                 const isCorrectPassword = await comparePassword(password, user.password);
                 if(isCorrectPassword) {
                     delete user.password;
                     req.user = user;
                     next()
                    }
                 else res.status(401).json({
                     status: 'fail',
                     message: 'invalid email/password'
                 })
             }
        }
    }

    static authenticate(req, res, next){
        const token = checkToken(req);
        if(!token)
        res.status(401).json({
            status: 'fail',
            message: 'Access denied, token is required'
        })
        else{
           try {
                const decoded = verifyToken(token);
                req.decoded = decoded;
                next();
           }
           catch(e){
            res.status(401).json({
                status: 'fail',
                message: 'Access denied, token is invalid'
            })
           }
        }

    }

}