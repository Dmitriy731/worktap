import { prisma } from '~/server/prisma';
import { getCurrentUser } from '../utils/auth';

export default defineEventHandler(async (event) => {
  const user = await getCurrentUser(event);
  if (!user) throw createError({ statusCode: 401, statusMessage: 'Не авторизован' });

  const body = await readBody(event); // { title: string }

  if (!body.title) throw createError({ statusCode: 400, statusMessage: 'Нет заголовка' });

  const todo = await prisma.todo.create({
    data: {
      title: body.title,
      userId: user.id,
    },
  });

  return { todo };
});
