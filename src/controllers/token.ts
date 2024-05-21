import { Request, Response } from 'express';
import { tokenManager } from '../services';

const tokenController = {
    get: async (_: Request, res: Response) => {
        const data = await tokenManager.create();
        return res
            .status(data.success ? 200 : 500)
            .send(data);
    },
};

export default tokenController;
