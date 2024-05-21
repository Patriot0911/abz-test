import dbServices from "./db";

const positionsManager = {
    getAll: async () => {
        const { data, message, } = await dbServices.positions.getAll();
        if(message)
            return {
                success: false,
                status: 505,
                message,
            };
        if(!data || data.length < 1)
            return {
                success: false,
                status: 404,
                message: 'Positions not found',
            };
        return {
            success: true,
            status: 200,
            positions: data,
        };
    },
};

export default positionsManager;
