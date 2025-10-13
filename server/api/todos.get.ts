import { prisma } from '~/server/prisma';
import { getCurrentUser } from '../utils/auth';

export default defineEventHandler(async (event) => {
  const user = await getCurrentUser(event);
  if (!user) throw createError({ statusCode: 401, statusMessage: 'Не авторизован' });

  const todos = await prisma.todo.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
  });

  return { todos };
});
