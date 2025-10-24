import { prisma } from '~/server/prisma';
import bcrypt from 'bcrypt';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { firstName, lastName, email, phone, password, role } = body;

  // Проверка полей
  if (!firstName || !lastName || !email || !phone || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Заполните все поля',
    });
  }

  // Проверка уникальности
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw createError({
      statusCode: 409,
      statusMessage: 'Пользователь с таким email уже существует',
    });
  }

  // Хеширование пароля
  const hashedPassword = await bcrypt.hash(password, 10);

  // Сохранение в БД
  const user = await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
      role,
    },
  });

  return {
    user: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      role: user.role,
    },
  };
});
