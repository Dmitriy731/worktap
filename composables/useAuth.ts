import { publicRoutes } from '~/utils/publicRoutes'

export const useAuth = () => {
  const user = useState<any | null>('user', () => null)

  const login = async (email: string, password: string) => {
    const res = await $fetch<{ user: any }>('/api/login', {
      method: 'POST',
      body: { email, password },
      credentials: 'include',
    })
    user.value = res.user
    return res.user
  }

  const logout = async () => {
    await $fetch('/api/logout', { method: 'POST', credentials: 'include' })
    user.value = null
  }

  const fetchUser = async () => {
    try {
      const res = await $fetch<{ user: any | null }>('/api/auth/me', {
        credentials: 'include',
        onResponseError() {
          return { user: null }
        },
      })
      user.value = res.user
    } catch {
      user.value = null
    }
    return user.value
  }

  const isPublic = (path: string) => publicRoutes.includes(path)

  return { user, login, logout, fetchUser, isPublic }
}
