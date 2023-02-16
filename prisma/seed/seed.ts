import { PrismaClient } from '@prisma/client';
import { insertPowers } from './power.seed';
const prisma = new PrismaClient();

const main = async () => {
  await prisma.$connect();
  await insertPowers(prisma);
};

main();
