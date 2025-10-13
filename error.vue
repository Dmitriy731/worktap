<script setup lang="ts">
import type {NuxtError} from '#app'

definePageMeta({
  layout: 'default',
})

const { error } = defineProps<{
    error: NuxtError
}>();

function goToHome() {
    clearError({ redirect: '/' })
}
</script>

<template>
    <NuxtLayout>
        <div class="error">
            <UiTitle tag="h1" >{{ error.statusCode }} ошибка</UiTitle>
            <div v-if="error.statusCode === 404" class="error__subtitle">Страница не найдена, попробуйте перейти на главную страницу</div>
            <div v-else class="error__subtitle">{{ error.statusMessage }}</div>
            <UiButton theme="secondary" type="button" @click="goToHome">Главная страница</UiButton>
        </div>
    </NuxtLayout>
</template>

<style scoped lang="scss">
    .error {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        &__subtitle {
            font-size: 20px;
            line-height: 26px;
            margin-bottom: 64px;
            color: var(--cl-dark-gray);
            max-width: 436px;
            text-align: center;
        }
    }
</style>