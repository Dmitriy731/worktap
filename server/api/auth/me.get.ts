import { getCookie } from 'h3'
import jwt from 'jsonwebtoken'
import { prisma } from '~/server/prisma'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const token = getCookie(event, 'token')

  if (!token) {
    setResponseStatus(event, 401)
    return { user: null }
  }

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET) as { userId: number }

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
      },
    })

    return { user }
  } catch {
    setResponseStatus(event, 401)
    return { user: null }
  }
})
