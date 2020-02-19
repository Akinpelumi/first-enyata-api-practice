const express = require('express');
const router = express.Router();
const userController = require("../controllers/users");
const postController = require("../controllers/posts");
const authorization = require("../middleware/token");

router.post('/signup', userController.signup);
router.post('/login',  userController.login);
router.post('/posts', authorization.setToken, postController.createPost);
router.put('/manage-own-post/:id', authorization.setToken, postController.editOwnPost);
router.delete('/delete-own-post/:id', authorization.setToken, postController.deleteOwnPost);
router.get('/all-posts', authorization.setToken, postController.viewAllPosts);
router.get('/own-posts', authorization.setToken, postController.viewOwnPosts);
router.get('/single-post/:id', authorization.setToken, postController.viewAnyPost);
router.get('/logout', authorization.setToken, userController.logout);

module.exports = router;  