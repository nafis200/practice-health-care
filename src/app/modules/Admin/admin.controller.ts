import catchAsync from "../../../shared/catchAsync";
import { NextFunction, Request, RequestHandler, Response } from 'express';
import { AdminService } from "./admin.services";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from 'http-status';
import { adminFilterableFields } from "./admin.constant";
import pick from "../../../shared/pick";
// const pick = <T extends Record<string, unknown>, k extends keyof T>(obj: T, keys: k[]): Partial<T> => {
//     const finalObj: Partial<T> = {};
    
//     for (const key of keys) {
//         if (obj && Object.hasOwnProperty.call(obj, key)) {
//             finalObj[key] = obj[key]
//         }
//     }

//     console.log(finalObj)
//     return finalObj;
// }

// export default pick;
const getAllFromDB = catchAsync(async(req:Request,res:Response)=>{

    const filters = pick(req.query, adminFilterableFields);
    // export const adminFilterableFields = ['name', 'email', 'searchTerm', 'contactNumber'];
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder'])
    console.log(options)
    console.log(filters)
    const result = await AdminService.getAllFromDB(filters, options)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Admin data fetched!",
        // meta: result.meta,
        data: result
    })

})

const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await AdminService.getByIdFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Admin data fetched by id!",
        data: result
    });
})


const updateIntoDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await AdminService.updateIntoDB(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Admin data updated!",
        data: result
    })
})

const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await AdminService.deleteFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Admin data deleted!",
        data: result
    })
})


const softDeleteFromDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await AdminService.softDeleteFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Admin data deleted!",
        data: result
    })
});

export const AdminController = {
    getAllFromDB,
    getByIdFromDB,
    updateIntoDB,
    deleteFromDB,
    softDeleteFromDB
}

