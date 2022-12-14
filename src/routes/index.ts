import { Router } from 'express';
import rescue from 'express-rescue';
import userRouter from './user';
import storyRouter from './story';
import userAuth from '../middlewares/userAuth';

const router = Router();

router.use('/users', userRouter);
router.use('/stories', rescue(userAuth.handle), storyRouter);

export default router;
