import { positionsController } from '@/controllers';
import { Router } from 'express'

const positionsRouter = Router();

positionsRouter.get('/', positionsController.getAll);

export default positionsRouter;
