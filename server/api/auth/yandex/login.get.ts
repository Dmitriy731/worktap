import { sendRedirect } from 'h3'

export default defineEventHandler((event) => {
  const config = useRuntimeConfig()
  const query = getQuery(event)
  const redirect = query.redirect || '/'

  const url = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${config.YANDEX_CLIENT_ID}&redirect_uri=${encodeURIComponent(config.YANDEX_REDIRECT_URI)}&state=${encodeURIComponent(redirect)}`

  console.log('[Yandex Login] Redirecting to:', url)
  return sendRedirect(event, url)
})
