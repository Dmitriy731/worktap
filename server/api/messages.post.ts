import { prisma } from '~/server/prisma'
import { readBody, createError } from 'h3'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { text, roomId, senderId } = body

    if (!text || !roomId || !senderId) {
      throw createError({ statusCode: 400, message: 'text, roomId and senderId are required' })
    }

    const message = await prisma.message.create({
      data: {
        text,
        room: { connect: { id: roomId } },
        sender: { connect: { id: senderId } },
        createdAt: new Date()
      }
    })

    return message
  } catch (err: any) {
    console.error('❌ Error creating message:', err.message)
    throw createError({ statusCode: 500, message: err.message })
  }
})
