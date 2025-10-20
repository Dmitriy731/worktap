// middleware/api-redirect.global.ts
export default defineNuxtRouteMiddleware((to) => {
  if (to.path.startsWith('/api/')) {
    return abortNavigation() // ❌ не пускаем клиентский роутер в /api/*
  }
})
