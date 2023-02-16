import { PrismaClient } from '@prisma/client';
export const insertPowers = async (prisma: PrismaClient) => {
  await prisma.power.createMany({
    data: [
      {
        id: '1',
        name: 'Fire',
      },
      {
        id: '2',
        name: 'Water',
      },
      {
        id: '3',
        name: 'Thunder',
      },
    ],
  });
};
