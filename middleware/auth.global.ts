import { getCookie } from 'h3'
import { useAuthStore } from '~/stores/auth'

export default defineNuxtRouteMiddleware(async (to) => {
  const auth = useAuthStore()
  if (auth.isPublic(to.path)) return

  const config = useRuntimeConfig()

  // ✅ SSR: проверка токена через httpOnly cookie
  if (import.meta.server) {
    const event = useRequestEvent()
    if (!event) return navigateTo(`/auth/login?redirect=${to.fullPath}`)

    const token = getCookie(event, 'token')
    if (!token) return navigateTo(`/auth/login?redirect=${to.fullPath}`)

    try {
      const { verify } = await import('jsonwebtoken')
      verify(token, config.JWT_SECRET)
    } catch {
      return navigateTo(`/auth/login?redirect=${to.fullPath}`)
    }

    return
  }

  // ✅ CSR: проверка с помощью /api/auth/me
  if (!auth.user) {
    try {
      const res = await $fetch<{ user: any | null }>('/api/auth/me', {
        onResponseError() {
          throw new Error('Unauthorized')
        },
      })

      if (!res.user) {
        return navigateTo(`/auth/login?redirect=${to.fullPath}`)
      }

      auth.user = res.user
    } catch (err) {
      console.error('[auth middleware] error:', err)
      return navigateTo(`/auth/login?redirect=${to.fullPath}`)
    }
  }
})
