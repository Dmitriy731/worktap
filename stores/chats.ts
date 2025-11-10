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
    console.log('start', messages.value);

    try {
      messages.value = await $fetch<Message[]>(`/api/messages?roomId=${roomId}`)
      console.log(messages.value);
      
    } catch (err: any) {
      error.value = err.message || 'Ошибка загрузки сообщений'
    }
  }

  async function sendMessage(text: string, senderId: number) {
    try {
      await $fetch('/api/messages', {
        method: 'POST',
        body: {
          text,
          roomId: activeRoomId.value,
          senderId
        }
      })
    } catch (err: any) {
      error.value = err.message || 'Ошибка отправки сообщения'
      console.error(error.value)
    }
  }

  function activeRoom(id: number) {
    activeRoomId.value = id
    getMessages(id)
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

  getMessages(activeRoomId.value);

  return {
    chats,
    messages,
    getChats,
    getMessages,
    sendMessage,
    activeRoomId,
    activeRoom,
    loading,
    error,
  }
})
