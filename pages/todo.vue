<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useAuthStore } from '~/stores/auth';

const auth = useAuthStore();
const todos = ref<{ id: number; title: string; completed: boolean }[]>([]);
const newTodo = ref('');

async function fetchTodos() {
  try {
    const res = await $fetch<{ todos: typeof todos.value }>('/api/todos');
    todos.value = res.todos;
  } catch (err) {
    console.error('Ошибка загрузки задач:', err);
  }
}

async function addTodo() {
  if (!newTodo.value) return;

  try {
    const res = await $fetch('/api/todos', {
      method: 'POST',
      body: { title: newTodo.value },
    });
    todos.value.unshift(res.todo);
    newTodo.value = '';
  } catch (err) {
    console.error('Ошибка создания задачи:', err);
  }
}

onMounted(fetchTodos);
</script>

<template>
  <div>
    <h2>Привет, {{ auth.user?.firstName }}! Вот ваши задачи:</h2>
    <input v-model="newTodo" placeholder="Новая задача" />
    <button @click="addTodo">Добавить</button>

    <ul>
      <li v-for="todo in todos" :key="todo.id">
        {{ todo.title }} - <span>{{ todo.completed ? '✔️' : '❌' }}</span>
      </li>
    </ul>
  </div>
</template>
