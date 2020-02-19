const Post = require('../models/post');
const dotenv = require('dotenv').config();

//logged in users can create posts
const createPost = async (req, res, next) => {
    const {
        heading,
        post
    } = req.body;
    try {
        const data = await Post.findOne({
            post
        });
        if (data) {
            return res.status(401).json({
                message: 'This post is already in existence'
            })
        } else {
            const newPost = new Post ({
                heading,
                post
            });
            await newPost.save();
            return res.status(201).json({
                message: 'Post successfully created'
            })
        }
    } catch (err) {
        return next(err)
    }
};

//logged in users can view all the posts
const viewAllPosts = async (req, res, next) => {
    try {
        const data = await Post.find({});
        res.status(200).json({
            data
        });
    } catch (err) {
        return next(err);
    }
};

//logged in users can view any particular post of their choice
const viewAnyPost = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = await Post.findOne({
            _id: id
        });
        res.status(200).json({
            data
        });
    } catch (err) {
        return next(err);
    }
};

//Logged in user can edit his/her posts only
const editOwnPost = async (req, res, next) => {
    const {
        heading,
        post
    } = req.body
    try {
        id = req.params.id;
        const postObj = await Post.findById(id);
        if(postObj.owner.toString() !== req.user.userId)
        return res.status(403).json({
            message: 'You are not permitted to edit this post'
        })
        postObj.heading = heading;
        postObj.post = post;
        postObj.save();
        return res.status(200).json({
            message: 'Post updated successfully',
            data: postObj
        })
    } catch (err) {
        return next(err)
    }
}

//Logged in user can delete only his/her own posts
const deleteOwnPost = async (req, res, next) => {
    const {
        heading,
        post
    } = req.body
    try {
        id = req.params.id;
        const postObj = await Post.findById(id)
        if (postObj == null) {
            return res.status(404).json({
                message: 'This post does not exist'
            })
        }
        console.log(postObj);
        if (postObj.owner.toString() !== req.user.userId) {
            return res.status(403).json({
                message: 'You cannot delete this post'
            })
        } else {
            id = req.params.id;
            const   data = await Post.findByIdAndDelete(id);
            console.log(data);
            if(!data) {
                return res.status(401),json({
                    message: 'No post with this id'
                });
            } else {
                return res.status(200).json({
                    message: 'Post deleted successfully'
                })
            }
            data.save();
        }
    } catch (err) {
        return next(err);
    }
}

//logged in users can view all their own posts
const viewOwnPosts = async (req, res, next) => {
    try {
        const data = await Post.find({owner: req.user.userId});
        return res.status(200).json({
            message: 'Own posts',
            data
        })
    } catch (err) {
        return next(err)
    }
}

module.exports = { 
    createPost, 
    viewAllPosts, 
    viewAnyPost, 
    editOwnPost, 
    deleteOwnPost, 
    viewOwnPosts 
}