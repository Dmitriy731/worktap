import { prisma } from '~/server/prisma'
import { createError, readBody } from 'h3'

export default defineEventHandler(async (event) => {
  // получаем тело запроса
  const body = await readBody(event)

  const { user1Id, user2Id } = body

  if (!user1Id || !user2Id) {
    throw createError({ statusCode: 400, message: 'user1Id и user2Id обязательны' })
  }

  // создаём комнату
  const room = await prisma.room.create({
    data: {
      users: {
        connect: [{ id: user1Id }, { id: user2Id }]
      }
    },
    include: {
      users: true
    }
  })

  return room
})
