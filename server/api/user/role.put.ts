import { prisma } from '~/server/prisma'
import { getCurrentUser } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  const user = await getCurrentUser(event)
  if (!user) throw createError({ statusCode: 401, statusMessage: 'Не авторизован' })

  const { role } = await readBody<{ role: string }>(event)

  if (!role || !['CLIENT', 'CONTRACTOR'].includes(role)) {
    throw createError({ statusCode: 400, statusMessage: 'Неверная роль' })
  }

  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: { role },
  })

  return { user: updatedUser }
})
