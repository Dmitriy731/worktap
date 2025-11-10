import { prisma } from '~/server/prisma'
import { getQuery, createError } from 'h3'

export default defineEventHandler(async (event) => {
  const { roomId } = getQuery(event)

  if (!roomId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'roomId is required',
    })
  }

  try {
    const messages = await prisma.message.findMany({
      where: { roomId: Number(roomId) },
      include: {
        sender: {
          select: { id: true, firstName: true, lastName: true },
        },
      },
      orderBy: { createdAt: 'asc' },
    })

    return messages
  } catch (err: any) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to load messages',
      message: err.message,
    })
  }
})
