// server/plugins/ws.server.ts
import { WebSocketServer } from 'ws'
import { prisma } from '~/server/prisma'

export default defineNitroPlugin((nitroApp) => {
  const wss = new WebSocketServer({ port: 4000 })
  console.log('✅ WebSocket сервер запущен на порту 4000')

  // Список подключений по roomId
  const rooms = new Map<number, Set<WebSocket>>()

  wss.on('connection', (ws) => {
    console.log('🔗 Новый клиент подключен')

    // Подписка клиента на комнату
    ws.on('message', async (raw) => {
      try {
        const data = JSON.parse(raw.toString())

        // Подписка на комнату
        if (data.type === 'join') {
          const roomId = Number(data.roomId)
          if (!rooms.has(roomId)) rooms.set(roomId, new Set())
          rooms.get(roomId)!.add(ws)
          ws.roomId = roomId
          console.log(`👥 Клиент подписан на комнату ${roomId}`)
          return
        }

        // Отправка нового сообщения
        if (data.type === 'message') {
          const { text, senderId, roomId } = data
          if (!text || !senderId || !roomId) return // защита

          const message = await prisma.message.create({
            data: { text, senderId, roomId },
            include: {
              sender: { select: { id: true, firstName: true, lastName: true } },
            },
          })

          // Рассылаем всем клиентам комнаты
          const clients = rooms.get(roomId)
          if (clients) {
            for (const client of clients) {
              if (client.readyState === 1)
                client.send(JSON.stringify({ type: 'message', payload: message }))
            }
          }
        }
      } catch (err) {
        console.error('Ошибка WS:', err)
      }
    })

    ws.on('close', () => {
      if (ws.roomId && rooms.has(ws.roomId)) {
        rooms.get(ws.roomId)!.delete(ws)
      }
      console.log('❌ Клиент отключился')
    })
  })

  nitroApp.hooks.hook('close', () => wss.close())
})
