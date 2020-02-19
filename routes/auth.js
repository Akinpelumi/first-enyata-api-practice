import { Router } from 'express';
import { AuthController } from '../controllers';
import { AuthMiddleware } from '../middleware';

const { signup, signin  } = AuthController;
const { validateLoginInfo } = AuthMiddleware;

const router = Router();


router.post('/signup', signup);
router.post('/signin', validateLoginInfo, signin);


export default router;

