import { User } from "@prisma/client";

export interface IUser {
    name: string;
    email: string;
    phone: string;
    photo?: string;
    positionId: number;
};

export interface IPosition {
    name: string;
};

export interface IUsersQuery {
    page?:  string;
    count?: string;
};

export interface IUserSearchParams {
    id: string;
};

export interface IUser {
    name:           string;
    email:          string;
    phone:          string;
    position_id:    number;
};

export interface IUserExtend extends User {
    position: {
        name: string;
    };
};

export type TUserBody = Partial<IUser>;

export interface ITokenPayLoad {
    id:         number;
    expires:    Date;
};
