<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { useChatsStore } from '~/stores/chats'
import type { Chat } from '~/types/interface/chats/chat.interface'

const chatsStore = useChatsStore()
const authStore = useAuthStore()
const chats = ref<Chat[]>([])
const search = ref('')
const messageText = ref('')

onMounted(() => {
  if (!authStore.user) return
  chatsStore.getChats(authStore.user?.id)

  if (chatsStore.chats.length) {
      chatsStore.activeRoom(chatsStore.chats[0].id)
    }
})

watch(
  [() => chatsStore.chats, search],
  () => {
    chats.value = chatsStore.chats.filter((chat) => {
      const user = chat.users[0]
      if (!user) return false

      const searchTerm = search.value.toLowerCase().trim()
      const fullName = `${user.firstName} ${user.lastName}`.toLowerCase()
      return fullName.includes(searchTerm)
    })
  },
  { immediate: true }
)

const sendMessage = async () => {
  if (!messageText.value.trim() || !authStore.user) return
  chatsStore.sendMessage(messageText.value, authStore.user?.id)
  messageText.value = ''
}

const initChats = async () => {
  if (!authStore.user) return

  // 1️⃣ Получаем чаты
  await chatsStore.getChats(authStore.user.id)

  // 2️⃣ Если есть чаты, выбираем первую как активную
  if (chatsStore.chats.length > 0) {
    const firstRoomId = chatsStore.chats[0].id
    await chatsStore.activeRoom(firstRoomId)
  }
}

onMounted(() => {
  initChats()
})
</script>

<template>
  <div class="chat">
    <!-- <button @click="() => chatsStore.createChat(authStore.user.id, 3)">Создать чат</button> -->
    <h1>Чаты</h1>
    <div class="chat__wrap">
      <div class="chat__list">
        <UiInput
            id="search-users"
            v-model="search"
            type="text"
            name="search-users"
            variant="search"
            placeholder="Поиск"
        />
        <button v-for="chat in chats" :key="chat.id" :class="`chat__person ${chat.id === chatsStore.activeRoomId ? 'active' : ''}`" @click="() => chatsStore.activeRoom(chat.id)">
          <template v-for="user in chat.users" :key="user">
            <img class="chat__photo" :src="user.photo || '/images/profile-default.jpg'" alt="person" width="80" height="80">
            <div class="chat__name">{{ user.firstName + ' ' + user.lastName }}</div>
            <div v-if="chat.messages" class="chat__last-message">{{ chat.messages[0]?.text }}</div>
          </template>
        </button>
      </div>
      <div class="chat__chat">
        <div v-for="el in chatsStore.messages" :key="'messages'+el.id" :class="`chat__message ${el.senderId === authStore.user?.id ? 'sender' : ''}`" >
          {{ el }}
          <br>
          <br>
        </div>
        <input v-model="messageText" placeholder="Написать сообщение..." />
        <button @click="sendMessage">Отправить</button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .chat {
    &__wrap {
      display: flex;
      column-gap: 30px;
    }

    &__list {
      display: flex;
      flex-direction: column;
      width: 420px;
    }

    &__person {
      background-color: transparent;
      border-radius: 20px;
      border: none;

      padding: 20px;
      display: grid;
      align-items: center;
      justify-items: start;
      grid-template-columns: 80px 1fr;
      gap: 14px 20px;
      cursor: pointer;

      transition: background-color 0.3s;

      &:hover {
        background-color: var(--cl-white-ice);
      }

      &.active {
        background-color: var(--cl-white-ice);
      }
    }

    &__photo {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      grid-row: 1/3;
    }

    &__name {
      font-weight: 500;
      font-size: 16px;

      align-self: end;
    }

    &__last-message {
      font-size: 14px;
      color: #656084;

      align-self: start;
    }

    &__message {
        width: 80%;
      &.sender {
        margin-left: auto;
      }
    }
  }
</style>