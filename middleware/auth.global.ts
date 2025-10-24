import { getCookie } from 'h3'
import { useAuthStore } from '~/stores/auth'
import type { IUser } from '~/types/interface/user.interface'

export default defineNuxtRouteMiddleware(async (to) => {
  if (to.path.startsWith('/api/')) return

  const auth = useAuthStore()
  const config = useRuntimeConfig()

  // ==============================
  // SSR-проверка токена
  // ==============================
  if (import.meta.server) {
    const event = useRequestEvent()
    if (!event) return navigateTo(`/auth/login?redirect=${to.fullPath}`)

    const token = getCookie(event, 'token')
    if (token) {
      try {
        const { verify } = await import('jsonwebtoken')
        verify(token, config.JWT_SECRET)
        // Если авторизован и хочет попасть на login/register → редирект на /
        if (['/auth/login', '/auth/register'].includes(to.path)) {
          return navigateTo('/')
        }
        return
      } catch {
        // токен невалидный → редирект на login
        return navigateTo(`/auth/login?redirect=${to.fullPath}`)
      }
    } else {
      // нет токена → редирект на login для приватных страниц
      if (!auth.isPublic(to.path)) {
        return navigateTo(`/auth/login?redirect=${to.fullPath}`)
      }
    }
    return
  }

  // ==============================
  // CSR-проверка через /api/auth/me
  // ==============================
  if (!auth.user) {
    try {
      const res = await $fetch<{ user: IUser | null }>('/api/auth/me', {
        onResponseError() {
          throw new Error('Unauthorized')
        },
      })

      auth.user = res.user
    } catch {
      auth.user = null
    }
  }

  if (auth.user) {
    // Авторизован → не пускаем на login/register
    if (['/auth/login', '/auth/register'].includes(to.path)) {
      return navigateTo('/')
    }
    return
  }

  // Не авторизован → проверяем приватные страницы
  if (!auth.isPublic(to.path)) {
    return navigateTo(`/auth/login?redirect=${to.fullPath}`)
  }
})
