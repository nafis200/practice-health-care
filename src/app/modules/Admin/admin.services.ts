import { PrismaClient, UserStatus, type Admin, type Prisma } from "../../../generated/prisma";
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
  andCondions.push({
    isDeleted: false
})
//   console.log(Object.keys(filterData))



  const whereConditons: Prisma.AdminWhereInput = { AND: andCondions };

//   console.dir(whereConditons, { depth: "infinity" });

  const result = await prisma.admin.findMany({
    where: whereConditons,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder ? {
            [options.sortBy]: options.sortOrder
        } : {
            createdAt: 'desc'
        }
  });

  const total = await prisma.admin.count({
    where: whereConditons,
});

// return {
//   meta: {
//       page,
//       limit,
//       total
//   },
//   data: result
// };
return {
  meta: {
    page,
    limit,
    total
},
data: result
}
};




const getByIdFromDB = async (id: string): Promise<Admin | null> => {
  const result = await prisma.admin.findUnique({
      where: {
          id,
          isDeleted: false
      }
  })

  return result;
};

const updateIntoDB = async (id: string, data: Partial<Admin>): Promise<Admin> => {


  await prisma.admin.findUniqueOrThrow({
      where: {
          id,
          isDeleted: false
      }
  });

  const result = await prisma.admin.update({
      where: {
          id
      },
      data
  });

  return result;
};

const deleteFromDB = async (id: string): Promise<Admin | null> => {

  await prisma.admin.findUniqueOrThrow({
      where: {
          id
      }
  });

  const result = await prisma.$transaction(async (transactionClient) => {
      const adminDeletedData = await transactionClient.admin.delete({
          where: {
              id
          }
      });

      await transactionClient.user.delete({
          where: {
              email: adminDeletedData.email
          }
      });

      return adminDeletedData;
  });

  return result;
}


const softDeleteFromDB = async (id: string): Promise<Admin | null> => {
  await prisma.admin.findUniqueOrThrow({
      where: {
          id,
          isDeleted: false
      }
  });

  const result = await prisma.$transaction(async (transactionClient) => {
      const adminDeletedData = await transactionClient.admin.update({
          where: {
              id
          },
          data: {
              isDeleted: true
          }
      });

      await transactionClient.user.update({
          where: {
              email: adminDeletedData.email
          },
          data: {
              status: UserStatus.DELETED
          }
      });

      return adminDeletedData;
  });

  return result;
}
export const AdminService = {
  getAllFromDB,
  getByIdFromDB,
  updateIntoDB,
  deleteFromDB,
  softDeleteFromDB
};