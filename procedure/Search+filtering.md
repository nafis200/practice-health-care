import { PrismaClient } from "../../../generated/prisma";


const prisma = new PrismaClient();

const getAllFromDB = async (params:any) => {
    
    console.log(params)

    const result = prisma.admin.findMany({
        where:{
            name:{
                contains:params.searchterm,
                mode:'insensitive'
            }
        }
    })
    return result;
};

export const AdminService={
    getAllFromDB
}



<!-- ......................... -->


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


<!-- ............................... -->

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

  console.dir(andCondions,{depth:'infinity'})

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

output:  [
  {
    OR: [
      { name: { contains: 'tarin', mode: 'insensitive' } },
      { email: { contains: 'tarin', mode: 'insensitive' } },      { contactNumber: { contains: 'tarin', mode: 'insensitive' } }
    ]
  }
]

1. But dosent get data beacuse of searchTerm so we must be use an filters

<!-- ...................................................... -->


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

output: {
  AND: [
    {
      OR: [
        { name: { contains: 'tarin', mode: 'insensitive' } },
        { email: { contains: 'tarin', mode: 'insensitive' } 
},
        { contactNumber: { contains: 'tarin', mode: 'insensitive' } }
      ]
    }
  ]
}

11111. searchTerm conditions solve

<!-- ............................. -->
