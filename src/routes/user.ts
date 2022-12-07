import { Router } from 'express';
import { celebrate, Segments } from 'celebrate';
import rescue from 'express-rescue';
import { userCreateController } from '../modules/User/Create';
import Schemas from '../utils/JoiSchemas';
import { userLoginController } from '../modules/User/Login';

const userRouter = Router();

userRouter
  .route('/')
  .post(
    celebrate({ [Segments.BODY]: Schemas.createUser }),
    rescue(userCreateController.handle),
  );

userRouter
  .route('/login')
  .post(
    celebrate({ [Segments.BODY]: Schemas.createUser }), // It's the same schema for now
    rescue(userLoginController.handle),
  );

export default userRouter;
