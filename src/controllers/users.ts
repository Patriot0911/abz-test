import { TUserBody, IUsersQuery, IUserSearchParams } from "@/utils/interfaces";
import { Request, Response } from "express";
import { usersManager } from "@/services";
import { deleteFile } from "@/utils/multer";

const usersController = {
    getAll: async (req: Request, res: Response) => {
        const { page, count } = req.query as IUsersQuery;
        const { status, ...data } = await usersManager.getAll(page, count);
        return res
            .status(status)
            .send(data);
    },
    getById: async (req: Request, res: Response) => {
        const { id } = (req.params as unknown) as IUserSearchParams;
        const { status, ...data } = await usersManager.getById(id);
        return res
            .status(status)
            .send(data);    },
    create: async (req: Request, res: Response) => {
        const body = req.body as TUserBody;
        const file = req.file;
        const { token } = req.headers;
        const { status, ...data } = await usersManager.create(body, file as Express.Multer.File, token as string);
        if(!data.success && file)
            await deleteFile(file);
        return res
            .status(status)
            .send(data);
    },
};

export default usersController;
