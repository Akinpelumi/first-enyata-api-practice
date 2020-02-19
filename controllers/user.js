import { UserService } from '../services';


export default class UserController {
    static async getUsers(req, res, next){
        try{
            const data = await UserService.getAllUsers();
            res.status(200).json({
                status: 'Success',
                data,
                message: 'All users on display'
            });
        }catch(e){
            console.log(e.message);
            const err = new Error('Error fetching users');
            next(err);
        }
    }

    static async getOneUser(req, res, next){
        try{
            const data = await UserService.getOneUser(req.params.id);
            res.status(200).json({
                status: 'Success',
                data,
                message: 'Requested user on display'
            });
        }catch(e){
            console.log(e.message);
            const err = new Error('Error fecthing the particular user');
            next(err);
        }
    }
}