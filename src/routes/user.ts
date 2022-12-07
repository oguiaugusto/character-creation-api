import { Router } from 'express';
import { celebrate, Segments } from 'celebrate';
import rescue from 'express-rescue';
import { userCreateController } from '../modules/User/Create';
import Schemas from '../utils/JoiSchemas';

const userRouter = Router();

userRouter
  .route('/')
  .post(
    celebrate({ [Segments.BODY]: Schemas.createUser }),
    rescue(userCreateController.handle),
  );

export default userRouter;
