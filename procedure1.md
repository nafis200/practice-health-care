
<!-- 57--1 -->
1. Response Formatting And Exception Handling.

2. 

<!-- 57-3 -->

Implementing Search?Filter using serachTerm query.

Req.query er moddhe searchTerm e pabo

3. Search + filtering e ache

4. ValidData + pickFunctions

Validity check then take data

5. Pagination To Results

const calculatePagination = (options: IOptions): IOptionsResult => {

    const page: number = Number(options.page) || 1;
    const limit: number = Number(options.limit) || 10;
    const skip: number = (Number(page) - 1) * limit;

    const sortBy: string = options.sortBy || 'createdAt';
    const sortOrder: string = options.sortOrder || 'desc';

    return {
        page,
        limit,
        skip,
        sortBy,
        sortOrder
    }
}

paginations er work admin.services



