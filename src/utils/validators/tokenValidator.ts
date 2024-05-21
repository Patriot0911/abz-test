import { TOKEN_SECRET } from "@/services/token";
import { ITokenPayLoad } from "../interfaces";
import dbServices from "@/services/db";
import jwt from 'jsonwebtoken';

const tokenValidator = async (token: any) => {
    if(!token || typeof token !== 'string')
        return {
            success: false,
        };
    try {
        const decoded = jwt.verify(token, TOKEN_SECRET);
        const tokenData = decoded as ITokenPayLoad;
        if(!tokenData || !tokenData.id || typeof tokenData.id !== 'number')
            return {
                success: false,
            };
        const dbToken = await dbServices.token.getById(tokenData.id);
        if(dbToken.message || !dbToken.data)
            return {
                success: false,
            };
        const timeDiff = new Date(dbToken.data.expires).getTime() - new Date().getTime();
        if(timeDiff < 0) {
            await dbServices.token.delete(tokenData.id);
            return  {
                success: false,
            };
        };
        return {
            success: true,
            id: tokenData.id,
        };
    } catch (e) {
        return {
            success: false,
        };
    };
};

export default tokenValidator;
