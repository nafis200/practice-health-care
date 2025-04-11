import { PrismaClient } from "../../../generated/prisma";

const prisma = new PrismaClient();

const getAllFromDB = async (params: any) => {
  console.log(params);

  const result = prisma.admin.findMany({
    where: {
      OR: [
        {
          name: {
            contains: params.searchterm,
            mode: "insensitive",
          },
        },
        {
            email: {
                contains: params.searchterm,
                mode: "insensitive",
              },
        }
      ],
    },
  });
  return result;
};

export const AdminService = {
  getAllFromDB,
};
