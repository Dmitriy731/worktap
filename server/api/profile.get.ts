// server/api/profile.get.ts
import { prisma } from '~/server/prisma';
import jwt from 'jsonwebtoken';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const token = getCookie(event, 'token');

  if (!token) {
    throw createError({ statusCode: 401, statusMessage: 'Нет токена' });
  }

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET) as { userId: number };
    const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
    return { user };
  } catch (err) {
    throw createError({ statusCode: 401, statusMessage: 'Неверный токен' });
  }
});
