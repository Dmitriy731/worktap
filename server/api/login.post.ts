// server/api/login.post.ts
import { prisma } from '~/server/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default defineEventHandler(async (event) => {
  const { email, password, rememberMe } = await readBody(event);
  const config = useRuntimeConfig();

  // 1. Найти пользователя по email
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Пользователь не найден',
    });
  }

  // 2. Проверить пароль
  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Неверный пароль',
    });
  }

  const expiresIn = rememberMe ? '30d' : '1d';

  // 3. Создать JWT токен
  const token = jwt.sign({ userId: user.id }, config.JWT_SECRET, {
    expiresIn,
  });

  // 4. Отправить токен в cookie
  setCookie(event, 'token', token, {
    httpOnly: true,
    maxAge: rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 24,
  });

  // 5. Вернуть информацию о пользователе
  return {
    user: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      role: user.role,
      photo: user.photo,
    },
  };
});
