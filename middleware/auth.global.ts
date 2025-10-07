export default defineNuxtRouteMiddleware((to) => {

  // Указываем публичные страницы
  const publicPages = ['/', '/auth/login', '/auth/register', '/about', '/ui-kit'] // /ui-kit Удалить потом

  if (publicPages.includes(to.path)) return

  const auth = useCookie<{ token: string }>('auth')

  if (!auth.value?.token) {
    return navigateTo(`/auth/login?redirect=${encodeURIComponent(to.fullPath)}`)
  }
})
