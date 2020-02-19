const express = require('express');
import { PostController } from '../controllers';
import { AuthMiddleware } from '../middleware';


const router = express.Router();
const { authenticate } = AuthMiddleware;
const{ createPost } = PostController;

router.use(authenticate);

router.get('/', PostController.getPosts);
router.get('/:id', PostController.getOnePost);
router.get('/own/:user_id', PostController.getOwnPosts);
router.post('/', createPost);
router.put('/:id', PostController.updateOnePost);
router.delete('/:id', PostController.deletePost);

export default router;