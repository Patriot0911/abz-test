import { IUserExtend } from '@/utils/interfaces';
import { userMapper } from '../mappers';
import dbServices from '../db';

const getById = async (id: string) => {
    if(!id || !parseInt(id))
        return {
            status: 400,
            success: false,
            message: 'The user with the requestedid does not exist',
            fails: {
                userId: [
                    'The user must be an integer.',
                ],
            },
        };
    const { data, message, } = await dbServices.users.getById(parseInt(id));
    if(!data)
        return {
            status: 404,
            success: false,
            message: 'User not found.',
        };
    if(message)
        return {
            status: 500,
            success: false,
            message,
        };
    const user = userMapper.get(data as IUserExtend);
    return {
        status: 200,
        success: true,
        user,
    };
}

export default getById;
