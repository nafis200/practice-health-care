import { PrismaClient, type Prisma } from "../../../generated/prisma";
import { adminSearchAbleFields } from "./admin.constant";

const prisma = new PrismaClient();

const getAllFromDB = async (params: any) => {
  const { searchTerm, ...filterData } = params;
  console.log(params);
  console.log(filterData)

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

  //   console.dir(andCondions,{depth:'infinity'})

  const whereConditons: Prisma.AdminWhereInput = { AND: andCondions };

  console.dir(whereConditons, { depth: "infinity" });

  const result = prisma.admin.findMany({
    where: whereConditons,
  });
  return result;
};

export const AdminService = {
  getAllFromDB,
};

Output:

 { email: 'tarin ahamed' }
[Object: null prototype] { email: 'tarin ahamed' }  
{ email: 'tarin ahamed' }
{
  AND: [
    {
      AND: [ { email: { equals: 'tarin ahamed' } } ]
    }
  ]
}