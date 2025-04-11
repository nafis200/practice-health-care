import { PrismaClient, type Prisma } from "../../../generated/prisma";
import { adminSearchAbleFields } from "./admin.constant";

const prisma = new PrismaClient();

const getAllFromDB = async (params: any) => {
  console.log(params);

  const andCondions: Prisma.AdminWhereInput[] = [];

  //console.log(filterData);
  if (params.searchTerm) {
      andCondions.push({
          OR: adminSearchAbleFields.map(field => ({
              [field]: {
                  contains: params.searchTerm,
                  mode: 'insensitive'
              }
          }))
      })
  };

//   console.dir(andCondions,{depth:'infinity'})

  const whereConditons: Prisma.AdminWhereInput = { AND: andCondions }

  console.dir(whereConditons,{depth:'infinity'})

  const result = prisma.admin.findMany({
    where: whereConditons
  });
  return result;
};

export const AdminService = {
  getAllFromDB,
};
