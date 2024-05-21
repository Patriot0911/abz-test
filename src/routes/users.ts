import { usersController } from '@/controllers';
import { upload } from '@/utils/multer';
import { Router } from 'express'

const userRouter = Router();

userRouter.get('/:id', usersController.getById);
userRouter.get('/', usersController.getAll);

userRouter.post('/', upload.single('file'), usersController.create);

export default userRouter;
