import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { IUser } from "../../utils/interfaces";

class userDbManager {
    constructor(
        private prisma: PrismaClient
    ) {};

    async getById(id: number) {
        if(!id || typeof id !== "number")
            return {
                message: 'Id is invalid',
            };
        try {
            const user = await this.prisma.user.findFirst({
                where: {
                    id,
                },
            });
            return {
                data: user,
            };
        } catch (e) {
            const { message } = <PrismaClientKnownRequestError> e;
            return {
                message,
            };
        };
    };

    async getAll(page?: number, take?: number) {
        const takeStep = take ?? 5;
        const pageFilter = {
            skip: page && (page-1)*takeStep,
            take: takeStep,
        };
        try {
            const users = await this.prisma.user.findMany({
                ...pageFilter,
                include: {
                    position: {
                        select: {
                            name: true,
                        },
                    },
                },
            });
            return {
                data: users,
            };
        } catch (e) {
            const { message } = <PrismaClientKnownRequestError> e;
            return {
                message,
            };
        };
    };

    async getCount() {
        try {
            const usersCount = await this.prisma.user.count();
            return {
                data: usersCount,
            };
        } catch (e) {
            const { message } = <PrismaClientKnownRequestError> e;
            return {
                message,
            };
        };
    };

    async create(userDate: IUser) {
        const {
            email,
            name,
            phone,
            position_id,
            photo,
        } = userDate;
        console.log(photo);
        try {
            const position = await this.prisma.position.findFirst({
                where: {
                    id: position_id,
                },
            });
            if(!position)
                return {
                    status: 400,
                    message: 'Unknown posittion',
                };
            const user = await this.prisma.user.create({
                data: {
                    email,
                    name,
                    phone,
                    positionId: position.id,
                    photo,
                },
            });
            return {
                data: user,
            };
        } catch(e) {
            const { message, code, meta } = <PrismaClientKnownRequestError> e;
            if(code === 'P2002')
                return {
                    message: `Field '${(meta as any)['target']}' has to be unique.`,
                };
            return {
                message,
            };
        };
    };
};

export default userDbManager;
