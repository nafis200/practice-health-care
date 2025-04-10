import { Request, RequestHandler, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { userService } from "./user.services";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";

const createAdmin = catchAsync(async(req:Request,res:Response)=>{
    const result = await userService.createAdmin(req.body);
    sendResponse(res,{
        statusCode: httpStatus.OK,
        success: true,
        message: "Admin Created successfuly!",
        data: result
    })
})

export const userController = {
    createAdmin
}