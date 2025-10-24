// server/utils/auth.ts
import { prisma } from '~/server/prisma';
import jwt from 'jsonwebtoken';

export async function getCurrentUser(event: any) {
  const config = useRuntimeConfig();
  const token = getCookie(event, 'token');

  if (!token) return null;

  try {
    const payload = jwt.verify(token, config.JWT_SECRET) as { userId: number };
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        role: true,
      },
    });
    return user;
  } catch (err) {
    return null;
  }
}
