import { UserService } from '../services';
import { Helper } from '../utils';

const { generateToken } = Helper;


export default class Auth{
    static async signup(req, res, next){
        try{
            const user =  new UserService(req.body);
            const { id } = await user.save();
            const token = generateToken({ id });
            delete user.plainPassword;
            res.status(201).json({
                status: 'Success',
                message: 'New user has been created',
                data: {id, ...user, token}
            });
        }catch(e){
            console.log(e.message);
            const err = new Error('Error creating new user');
            next(err);
        }
    }

    static signin(req, res){
        const { user } = req;
        const token = generateToken({ id: user.id });
        res.status(200).json({
            status: 'Success',
            message: 'Successfully signed in user',
            data: {...user, token}
        });
    }
}