import { db, queries } from '../db';
import { PostModel } from '../models'

const { postQueries: {allPosts, onePost, allOwnPosts, createPost, updatePost, deletePost}} = queries;

export default class PostService extends PostModel {
    constructor(options){
        super(options)
    }
    async save() {
        const { user_id, heading, post } = this;
        return db.one(createPost, [user_id, heading, post]);
    }
    
    static getAllPosts(){
        return db.any(allPosts);
    }

    static getOnePost(id){
        return db.one(onePost, id);
    }

    static getAllOwnPosts(user_id){
        return db.any(allOwnPosts, user_id);
    }

    static updatePost(heading, post, id){
        return db.none(updatePost, [heading, post, id]);
    }

    static deleteOnePost(id){
        return db.result(deletePost, id);
    }
}