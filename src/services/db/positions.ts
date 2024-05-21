import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { IPosition } from "../../utils/interfaces";

class positionDbManager {
    constructor(
        private prisma: PrismaClient
    ) {};

    async getById(id: number) {
        if(!id || typeof id !== "number")
            return {
                message: 'Id is invalid',
            };
        try {
            const position = await this.prisma.position.findFirst({
                where: {
                    id,
                },
            });
            return {
                data: position,
            };
        } catch (e) {
            const { message } = <PrismaClientKnownRequestError> e;
            return {
                message,
            };
        };
    };

    async getAll() {
        try {
            const positions = await this.prisma.position.findMany();
            return {
                data: positions,
            };
        } catch (e) {
            const { message } = <PrismaClientKnownRequestError> e;
            return {
                message,
            };
        };
    };

    async create(positionData: IPosition) {
        try {
            const position = await this.prisma.position.create({
                data: {
                    name: positionData.name,
                },
            });
            return {
                data: position,
            };
        } catch(e) {
            const { message } = <PrismaClientKnownRequestError> e;
            return {
                message,
            };
        };
    };
};

export default positionDbManager;
