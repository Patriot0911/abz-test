import { validate as emailValidator}  from 'email-validator';
import { IUser, TUserBody } from "../interfaces";
import { fileSize, fileTypes } from '../multer';

interface TUserFails {
    name:           string[];
    email:          string[];
    phone:          string[];
    position_id:    string[];
    photo:          string[];
};

const userCreationValidator = (user: TUserBody, file: Express.Multer.File) => {
    const fails: TUserFails = {
        name: [],
        email: [],
        phone: [],
        position_id: [],
        photo: [],
    };
    const failRes = {
        success: false,
        message: 'Validation failed',
    };
    if(!file) {
        fails.photo.push('No photo found');
    } else {
        if(file.size > fileSize)
            fails.photo.push('The photo may not be greater than 5 Mbytes.');
        if(!fileTypes.includes(file.mimetype))
            fails.photo.push('Unsupported file format.');
    };
    if(!user.name) {
        fails.name.push('No name specified.');
    } else {
        if(user.name.length < 2)
            fails.name.push('The name must be at least 2 characters.');
        if(user.name.length > 60)
            fails.name.push('The name must be at most 60 characters.');
    };
    if(!user.email || !emailValidator(user.email))
        fails.email.push('The email must be a valid email address.');
    if(!user.phone) {
        fails.phone.push('The phone field is required.');
    } else {
        if(!user.phone.startsWith('+380'))
            fails.phone.push('The phone number must be a valid phone number.');
    };
    if(!user.position_id || (typeof user.position_id !== 'number' && !parseInt(user.position_id)))
        fails.position_id.push('The position id must be an integer.');
    for(const item of Object.values(fails)) {
        if(item && item.length > 0)
            return {
                ...failRes,
                fails,
            };
    };
    return {
        success: true,
        user: {
            ...user as IUser,
            position_id: typeof user.position_id !== 'number' ? parseInt(user.position_id as any) : user.position_id
        },
    };
};

export default userCreationValidator;
