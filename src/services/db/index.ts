import { PrismaClient } from "@prisma/client";
import positionDbManager from "./positions";
import tokenDbManager from "./token";
import userDbManager from "./users";

const prisma = new PrismaClient();

const dbServices = {
    token:      new tokenDbManager(prisma),
    users:      new userDbManager(prisma),
    positions:  new positionDbManager(prisma),
};

export default dbServices;
