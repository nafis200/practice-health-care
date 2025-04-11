import catchAsync from "../../../shared/catchAsync";
import { NextFunction, Request, RequestHandler, Response } from 'express';
import { AdminService } from "./admin.services";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from 'http-status';
import { adminFilterableFields } from "./admin.constant";
import pick from "../../../shared/pick";
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
        data:result
    })

})

export const AdminController = {
    getAllFromDB,
}

