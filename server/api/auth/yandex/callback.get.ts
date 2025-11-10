import { prisma } from '~/server/prisma'
import jwt from 'jsonwebtoken'
import { setCookie, sendRedirect, createError, getQuery } from 'h3'
import { UserRole } from '~/types/enum/user-role.enum'

const processedCodes = new Set()

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const code = query.code as string
  const state = (query.state as string) || '/'

  if (!code) {
    throw createError({ statusCode: 400, statusMessage: 'Code not found' })
  }

  // 🔒 Проверяем, не обрабатывался ли уже этот код
  if (processedCodes.has(code)) {
    return sendRedirect(event, state)
  }
  processedCodes.add(code)
  if (processedCodes.size > 100) {
    const firstCode = processedCodes.values().next().value
    processedCodes.delete(firstCode)
  }

  const config = useRuntimeConfig()

  // 1️⃣ Получаем access_token
  let tokenResponse
  try {
    tokenResponse = await $fetch('https://oauth.yandex.ru/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        client_id: config.YANDEX_CLIENT_ID,
        client_secret: config.YANDEX_CLIENT_SECRET,
        redirect_uri: config.YANDEX_REDIRECT_URI,
      }),
    }) as { access_token: string }
  } catch (err: any) {
    // Если код уже использован или ошибка 400 — просто редиректим
    if (err?.status === 400) {
      return sendRedirect(event, state)
    }
    throw createError({ statusCode: 400, statusMessage: 'Failed to fetch Yandex token' })
  }

  const accessToken = tokenResponse.access_token
  if (!accessToken) {
    throw createError({ statusCode: 400, statusMessage: 'No access token' })
  }

  // 2️⃣ Получаем данные пользователя
  const userData = await $fetch('https://login.yandex.ru/info', {
    headers: { Authorization: `OAuth ${accessToken}` },
  }) as { default_email: string; first_name?: string; last_name?: string }

  if (!userData.default_email) {
    throw createError({ statusCode: 400, statusMessage: 'No email from Yandex' })
  }

  // 3️⃣ Проверяем пользователя в БД
  let user = await prisma.user.findUnique({
    where: { email: userData.default_email },
  })

  if (!user) {
    user = await prisma.user.create({
      data: {
        email: userData.default_email,
        firstName: userData.first_name || '',
        lastName: userData.last_name || '',
        password: '',
        phone: '',
        role: UserRole.Client
      },
    })
  }

  // 4️⃣ Создаём JWT
  const token = jwt.sign({ userId: user.id }, config.JWT_SECRET, { expiresIn: '7d' })

  // 5️⃣ Устанавливаем cookie
  setCookie(event, 'token', token, {
    httpOnly: true,
    secure: false, // true в продакшене
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  })

  // 🎯 Единственный ответ — редирект
  return sendRedirect(event, state)
})