// server/api/auth/yandex/redirect.get.ts
import { sendRedirect, setCookie, getQuery } from 'h3'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const rememberMe = query.rememberMe === 'true' // передаём с фронта ?rememberMe=true

  // сохраняем rememberMe во временную cookie
  setCookie(event, 'rememberMe', rememberMe ? '1' : '0', {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 5, // 5 минут, достаточно на редирект
  })

  const config = useRuntimeConfig()

  const yandexAuthUrl = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${config.YANDEX_CLIENT_ID}&redirect_uri=${config.YANDEX_REDIRECT_URI}&state=/`

  return sendRedirect(event, yandexAuthUrl)
})
