// server/api/auth/yandex/login.get.ts
import { sendRedirect } from 'h3'

export default defineEventHandler((event) => {
  const config = useRuntimeConfig()
  const redirect = '/api/auth/yandex/callback' // вот сюда Яндекс вернёт code

  const url = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${config.YANDEX_CLIENT_ID}&redirect_uri=${encodeURIComponent(config.YANDEX_REDIRECT_URI || redirect)}&state=/`
  return sendRedirect(event, url)
})
