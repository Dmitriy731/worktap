export default defineEventHandler((event) => {
  const config = useRuntimeConfig();

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: config.YANDEX_CLIENT_ID,
    redirect_uri: config.YANDEX_REDIRECT_URI,
  });

  return sendRedirect(event, `https://oauth.yandex.ru/authorize?${params.toString()}`);
});
