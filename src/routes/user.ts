import { Router } from 'express';
import { userCreateController } from '../modules/User/Create';

const userRouter = Router();

userRouter
  .route('/')
  .post(
    userCreateController.handle,
  );

export default userRouter;
