import { PrismaClient, type Prisma } from "../../../generated/prisma";
import { paginationHelper } from "../../../helpars/paginationHelper";
import type { IPaginationOptions } from "../../interfaces/pagination";
import { adminSearchAbleFields } from "./admin.constant";

import { IAdminFilterRequest } from "./admin.interface";
const prisma = new PrismaClient();


// const calculatePagination = (options: IOptions): IOptionsResult => {

//   const page: number = Number(options.page) || 1;
//   const limit: number = Number(options.limit) || 10;
//   const skip: number = (Number(page) - 1) * limit;

//   const sortBy: string = options.sortBy || 'createdAt';
//   const sortOrder: string = options.sortOrder || 'desc';

//   return {
//       page,
//       limit,
//       skip,
//       sortBy,
//       sortOrder
//   }
// }

const getAllFromDB = async (params: IAdminFilterRequest, options: IPaginationOptions) => {
  const { searchTerm, ...filterData } = params;
  // console.log(params);
  // console.log(filterData)

  const {page, limit, skip } = paginationHelper.calculatePagination(options);

  console.log(limit,skip,"limit skip")

  const andCondions: Prisma.AdminWhereInput[] = [];

  //console.log(filterData);
  if (params.searchTerm) {
    andCondions.push({
      OR: adminSearchAbleFields.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andCondions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }
//   console.log(Object.keys(filterData))

  //   console.dir(andCondions,{depth:'infinity'})

  const whereConditons: Prisma.AdminWhereInput = { AND: andCondions };

//   console.dir(whereConditons, { depth: "infinity" });

  const result = prisma.admin.findMany({
    where: whereConditons,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder ? {
            [options.sortBy]: options.sortOrder
        } : {
            createdAt: 'desc'
        }
  });

//   const total = await prisma.admin.count({
//     where: whereConditons
// });

 return result
};

export const AdminService = {
  getAllFromDB,
};


<!-- controller -->
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

export const AdminController = {
    getAllFromDB,
}

