import { PostService } from '../services';

export default class PostControllers {
    static async createPost (req, res, next){
        try{
            const post = new PostService(req.body);
            const { id } = await post.save();
            res.status(201).json({
                status: 'Success',
                message: 'New post has been created',
                data: {id, ...post}
            });
        }catch(e){
            console.log(e.message);
            const err = new Error('Error creating new post');
            next(err);
        }
    }

    static async getPosts (req, res, next) {
        try{
            const data = await PostService.getAllPosts();
            res.status(200).json({
                status: 'Success',
                data,
                message: 'All posts on display'
            });
        }catch(e){
            console.log(e.message);
            const err = new Error('Error fetching posts');
            next(err);
        }
    }

    static async getOwnPosts (req, res, next) {
        try{
            const data = await PostService.getAllOwnPosts(req.params.user_id);
            res.status(200).json({
                status: 'Success',
                data,
                messages: 'All own posts on display'
            });
        }catch(e) {
            console.log(e.message);
            const err = new Error('Error fecthing own posts');
            next(err);
        }
    }

    static async getOnePost (req, res, next) {
        try{
            const data = await PostService.getOnePost(req.params.id);
            res.status(200).json({
                status: 'Success',
                data,
                message: 'Requested post on display'
            });
        }catch(e){
            console.log(e.message);
            const err = new Error('Error fetching particular post');
            next(err);
        }
    }

    static async updateOnePost (req, res, next) {
        try{
            const data = await PostService.updatePost(req.body.heading, req.body.post, req.params.id);
            res.status(201).json ({
                status: 'Success',
                message: 'post updated succesfully'
            });
        }catch(e){
            console.log(e.message);
            const err = new Error('Error updating the post');
            next(err);
        }
    }

    static async deletePost (req, res, next) {
        try{
            const data = await PostService.deleteOnePost(req.params.id);
            res.status(200).json({
                status: 'Success',
                message: `Post deleted successfully`
            });
        }catch(e){
            console.log(e.message);
            const err = new Error('Failed to delete the post');
            next(err);
        }
    }
}