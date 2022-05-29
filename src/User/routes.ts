import { celebrate, Segments } from 'celebrate';
import { Router } from 'express';
import { Schemas } from '../schemas/joi';
import { createController } from './Create';

const userRouter = Router();

userRouter
  .route('/')
  .post(
    celebrate({
      [Segments.BODY]: Schemas.UserPost,
    }),
    createController.handle,
  );

export default userRouter;
