
admin.controller e kaj kori.

pick(req.query,['name','email','searchTerm'])

why need filters beacuse of an user give

pick(req.query,['namess','emailss','searchTermssss'])

But there is no property you must be used searchTerm not searchTermsss


const pick = <T extends Record<string, unknown>, k extends keyof T>(obj: T, keys: k[]): Partial<T> => {
    const finalObj: Partial<T> = {};
    
    for (const key of keys) {
        if (obj && Object.hasOwnProperty.call(obj, key)) {
            finalObj[key] = obj[key]
        }
    }

    console.log(finalObj)
    return finalObj;
}

export default pick;

const getAllFromDB = catchAsync(async(req:Request,res:Response)=>{

    const filters = pick(req.query, adminFilterableFields);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder'])
    console.log(options)
    console.log(filters)
    const result = await AdminService.getAllFromDB(req.query)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Admin data fetched!",
        data:result
    })

})

<!-- ........................ -->

export const adminFilterableFields = ['name', 'email', 'searchTerm', 'contactNumber'];

Age vul bal data dile crush korbe but after implement pick function now work properly