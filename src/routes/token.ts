import { tokenController } from '@/controllers';
import { Router } from 'express'

const tokenRouter = Router();

tokenRouter.get('/', tokenController.get);

export default tokenRouter;
