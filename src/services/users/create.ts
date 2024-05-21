import { tokenValidator, userCreationValidator } from "@/utils/validators";
import { TUserBody } from "@/utils/interfaces";
import dbServices from "../db";

const create = async (userData: TUserBody, file: Express.Multer.File, token: string) => {
    const isValidtoken = await tokenValidator(token);
    if(!isValidtoken.success)
        return {
            status: 401,
            success: false,
            message: 'The token expired or is invalid.',
        };
    const validation = userCreationValidator(userData, file);
    if(!validation.success)
        return  {
            status: 422,
            ...validation,
        };
    const validUser = validation.user!;
    const { data, message, status, } = await dbServices.users.create({
        ...validUser,
        photo: file.path,
    });
    if(message)
        return {
            status: status ?? 500,
            success: false,
            message,
        };
    await dbServices.token.delete(isValidtoken.id!);
    return {
        status: 201,
        success: true,
        user_id: data?.id,
        message: 'New user successfully registered',
    };
};

export default create;
