import { Router } from 'express';
import rescue from 'express-rescue';
import { userCreateController } from '../modules/User/Create';

const userRouter = Router();

userRouter
  .route('/')
  .post(
    rescue(userCreateController.handle),
  );

export default userRouter;
