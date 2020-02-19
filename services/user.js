import { db , queries } from '../db';
import { UserModel } from '../models';
import { Helper } from '../utils';

const { hashPassword } = Helper;
const {userQueries:{ allUsers, oneUser, createUser, getUserByEmail}} = queries;

export default class UserService extends UserModel {
    constructor(options){
        super(options)
    }
    async save(){
        const { first_name, last_name, email, plainPassword } = this;
        const hash = await hashPassword(plainPassword);
        return db.one(createUser, [first_name, last_name, email, hash]);
    }
    
    static getAllUsers(){
        return db.any(allUsers);
    }

    static getOneUser(id){
        return db.one(oneUser, id);
    }
    
    static fetchByEmail(email){
        return db.oneOrNone(getUserByEmail, [email]);
    }
}



