// stores/auth.ts
import { defineStore } from 'pinia'
import type { Chat } from '~/types/interface/chats/chat.interface'
import type { Message } from '~/types/interface/chats/message.interface'

export const useChatsStore = defineStore('chats', () => {
  const chats = ref<Chat[]>([])
  const messages = ref<Message[]>([])
  const loading = ref(true)
  const error = ref('')
  const activeRoomId = ref<number>(0)
  const connected = ref(false)
  const socket = ref<WebSocket | null>(null)

  async function getChats(userId: number) {
    try {
      chats.value = await $fetch<Chat[]>(`/api/rooms?userId=${userId}`)
    } catch (err: any) {
      error.value = err.message || 'Ошибка загрузки чатов'
      console.error(error.value)
    } finally {
      loading.value = false
    }
  }

  async function getMessages(roomId: number) {
    try {
      messages.value = await $fetch<Message[]>(`/api/messages?roomId=${roomId}`)
    } catch (err: any) {
      error.value = err.message || 'Ошибка загрузки сообщений'
    }
  }

  function connectToSocket(roomId: number) {
    if (socket.value) socket.value.close()

    socket.value = new WebSocket('ws://localhost:4000')

    socket.value.onopen = () => {
      connected.value = true
      console.log('✅ WS подключен')
      socket.value!.send(JSON.stringify({ type: 'join', roomId }))
    }

    socket.value.onmessage = (event) => {
      const data = JSON.parse(event.data)
      if (data.type === 'message') {
        messages.value = [...messages.value, data.payload]
        console.log('📩 Получено сообщение через WS:', data.payload)
      }
    }

    socket.value.onclose = () => {
      connected.value = false
      console.log('❌ WS отключен')
    }
  }

  async function createChat(user1Id: number, user2Id: number) {
    const room = await $fetch<Chat>('/api/rooms', {
      method: 'POST',
      body: {
        user1Id,
        user2Id
      }
    })

    chats.value.push(room)
  }

  async function sendMessage(text: string, senderId: number) {
    const newMessage = {
      id: Date.now(), // временный ID
      text,
      senderId,
      roomId: activeRoomId.value,
      createdAt: new Date().toISOString(),
    }

    // 🔹 Оптимистично добавляем сообщение в локальное состояние
    messages.value = [...messages.value, newMessage]

    try {
      // 🔹 Отправляем на сервер (в БД)
      const savedMessage = await $fetch('/api/messages', {
        method: 'POST',
        body: {
          text,
          roomId: activeRoomId.value,
          senderId,
        },
      })

      // 🔹 Обновляем временное сообщение "реальным" (если сервер вернул id)
      messages.value = messages.value.map((m) =>
        m.id === newMessage.id ? savedMessage : m
      )

      // 🔹 Если у тебя есть WS, сразу уведомляем других
      if (socket.value && connected.value) {
        socket.value.send(
          JSON.stringify({
            type: 'message',
            roomId: activeRoomId.value,
            text,        // текст сообщения
            senderId,    // id пользователя
          })
        )
      }
    } catch (err: any) {
      error.value = err.message || 'Ошибка отправки сообщения'
      console.error(error.value)
    }
  }

  async function activeRoom(id: number) {
    console.log(id);
    
    activeRoomId.value = id
    await getMessages(id)      // загружаем прошлые сообщения
    connectToSocket(id)        // подключаемся к WS и подписываемся на комнату
  }

  watch(
    chats,
    (newChats) => {
      if (newChats.length && !activeRoomId.value) {
        activeRoomId.value = newChats[0].id
      }
    },
    { immediate: true }
  )

  return {
    chats,
    messages,
    createChat,
    getChats,
    getMessages,
    sendMessage,
    activeRoomId,
    activeRoom,
    loading,
    error,
  }
})
