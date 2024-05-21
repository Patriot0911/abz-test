import { positionsManager } from '@/services';
import { Request, Response } from 'express';

const positionsController = {
    getAll: async (_: Request, res: Response) => {
        const { status, ...data } = await positionsManager.getAll();
        return res
            .status(status)
            .send(data);
    },
};

export default positionsController;
