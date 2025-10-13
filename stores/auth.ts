// stores/auth.ts
import { defineStore } from 'pinia'
import { publicRoutes } from '~/utils/publicRoutes'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<any | null>(null)
  const works = ref<any[]>([])
  const orders = ref<any[]>([])

  const login = async (email: string, password: string, rememberMe: boolean) => {
    const res = await $fetch<{ user: any }>('/api/login', {
      method: 'POST',
      body: { email, password, rememberMe },
      credentials: 'include',
    })
    user.value = res.user
    return res.user
  }

  const logout = async () => {
    await $fetch('/api/logout', { method: 'POST', credentials: 'include' })
    user.value = null
    works.value = []
    orders.value = []
  }

  const fetchUser = async () => {
    try {
      const res = await $fetch<{ user: any | null }>('/api/auth/me', {
        credentials: 'include',
        onResponseError() { return { user: null } },
      })
      user.value = res.user
    } catch {
      user.value = null
    }
    return user.value
  }

  const fetchWorks = async () => {
    if (!user.value) return []
    works.value = await $fetch('/api/works', { credentials: 'include' })
    return works.value
  }

  const fetchOrders = async () => {
    if (!user.value) return []
    orders.value = await $fetch('/api/orders', { credentials: 'include' })
    return orders.value
  }

  const isPublic = (path: string) => publicRoutes.includes(path)

  return { user, works, orders, login, logout, fetchUser, fetchWorks, fetchOrders, isPublic }
})
