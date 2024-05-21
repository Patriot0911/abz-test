interface IPagesFailsObject {
    count:  string[];
    page:   string[];
};

interface IPageValidatorFailResponse {
    status:     number;
    success:    boolean;
    message:    string;
    fails:      IPagesFailsObject;
};

interface IPageValidatorSuccessResponse {
    success: true;
};

const pagesValidator = (page?: string, count?: string): IPageValidatorFailResponse | IPageValidatorSuccessResponse => {
    if(page || count) {
        const fails: IPagesFailsObject = {
            count:  [],
            page:   [],
        };
        const failRes = {
            status:         422,
            success:        false,
            message:        'Validation failed',
        };
        if(!count || !parseInt(count))
            fails.count.push('The count must be an integer.');
        if(!page || !parseInt(page) || parseInt(page) < 1)
            fails.page.push('The page must be at least 1.');
        for(const item of Object.values(fails)) {
            if(item && item.length > 0)
                return {
                    ...failRes,
                    fails,
                };
        };
    };
    return {
        success: true,
    };
};

export default pagesValidator;
