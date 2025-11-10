import { prisma } from '~/server/prisma'
import { getQuery, createError } from 'h3'

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const userId = Number(query.userId)

    if (!userId) {
      throw createError({ statusCode: 400, message: 'User ID is required' })
    }

    console.log('▶ Получаем комнаты пользователя:', userId)

    // Получаем все комнаты, где участвует пользователь
    const rooms = await prisma.room.findMany({
      where: {
        users: {
          some: { id: userId },
        },
      },
      include: {
        users: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            photo: true,
          },
        },
        messages: {
          take: 1,
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            text: true,
            createdAt: true,
            senderId: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    // Фильтруем пользователей — убираем самого себя
    const sanitizedRooms = rooms.map(room => ({
      ...room,
      users: room.users.filter(user => user.id !== userId),
    }))

    return sanitizedRooms
  } catch (err: any) {
    console.error('❌ Room fetch error:', err.message)
    throw createError({ statusCode: 500, message: err.message })
  }
})
