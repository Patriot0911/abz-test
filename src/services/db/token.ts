import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

class tokenDbManager {
    constructor(
        private prisma: PrismaClient
    ) {};

    private getDefaultExpiresDate() {
        const delay = 40*60*1000;
        const now = new Date().getTime();
        return new Date(now+delay);
    };

    async getById(id: number) {
        if(!id || typeof id !== "number")
            return {
                message: 'Id is invalid',
            };
        try {
            const token = await this.prisma.token.findFirst({
                where: {
                    id,
                },
            });
            return {
                data: token,
            };
        } catch(e) {
            const { message } = <PrismaClientKnownRequestError> e;
            return {
                message,
            };
        };
    };

    async create(ends?: Date) {
        const expires = ends ? ends.toDateString() : this.getDefaultExpiresDate();
        try {
            const newToken = await this.prisma.token.create({
                data: {
                    expires,
                },
            });
            return {
                data: newToken,
            };
        } catch (e) {
            const { message } = <PrismaClientKnownRequestError> e;
            return {
                message,
            };
        };
    };

    async delete(id: number) {
        if(!id || typeof id !== "number")
            return {
                message: 'Id is invalid',
            };
        try {
            const token = await this.prisma.token.delete({
                where: {
                    id,
                },
            });
            return {
                data: token,
            };
        } catch (e) {
            const { message } = <PrismaClientKnownRequestError> e;
            return {
                message,
            };
        };
    };
};

export default tokenDbManager;
