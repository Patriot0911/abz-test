import { pagesValidator } from "@/utils/validators";
import { IUserExtend } from "@/utils/interfaces";
import { userMapper } from "../mappers";
import dbServices from "../db";

const getAll = async (page?: string, count?: string) => {
    const isValid = pagesValidator(page, count);
    if(!isValid.success)
        return isValid;
    const { data, message, } = await dbServices.users.getAll(
        page ? parseInt(page) : undefined,
        count ? parseInt(count) : undefined
    );
    if(message)
        return {
            status: 500,
            success: false,
            message,
        };
    if(page && (!data || data.length < 1))
        return {
            status: 404,
            success: false,
            message: 'Page not found',
        };
    const countData = await dbServices.users.getCount();
    if(countData.message)
        return {
            status: 500,
            success: false,
            message: countData.message,
        };
    const qPage = page ? parseInt(page) : undefined;
    const qCount = count ? parseInt(count) : undefined;
    const total_users = countData.data ? countData.data as number : undefined;
    const total_pages = !(total_users && qCount) ? undefined : Math.ceil(total_users/qCount);
    const users = userMapper.getAll(data as IUserExtend[]);
    return {
        status: 200,
        success: true,
        total_users,
        total_pages,
        count: qCount,
        page: qPage,
        users,
    };
};

export default getAll;
