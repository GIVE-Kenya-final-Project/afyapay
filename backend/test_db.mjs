import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
try {
  const users = await prisma.user.findMany();
  console.log('Users:', JSON.stringify(users));
} catch(err) {
  console.error('DB Error:', err.message, err.code);
} finally {
  await prisma.$disconnect();
}
