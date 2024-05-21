import { IUserExtend } from "@/utils/interfaces";

const userMapFunction = (user: IUserExtend) => {
    const {
        id,
        email,
        name,
        phone,
        photo,
    } = user;
    return {
        id,
        name,
        email,
        phone,
        photo,
        position: user.position.name,
        position_id: user.positionId,
        registration_timestamp: user.timestamp,
    };
};

const userMapper = {
    get: (user: IUserExtend) => {
        return userMapFunction(user);
    },
    getAll: (users: IUserExtend[]) => {
        return users.map(
            item => ({
                ...userMapFunction(item)
            })
        );
    },
};

export default userMapper;
