import catchAsync from "../../../shared/catchAsync";
import { NextFunction, Request, RequestHandler, Response } from 'express';
import { AdminService } from "./admin.services";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from 'http-status';
const getAllFromDB = catchAsync(async(req:Request,res:Response)=>{

    console.log(req.query)
    const result = await AdminService.getAllFromDB(req.query)

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

