<script setup lang="ts">
    import UiCheckbox from '~/components/ui/Checkbox.vue';
    import UiInput from '~/components/ui/Input.vue';
    import UiButton from '~/components/ui/Button.vue';
    import { useAuthStore } from '~/stores/auth';

    definePageMeta({
        layout: 'auth'
    })

    const authStore = useAuthStore();

    const { login } = authStore;

    const email = ref('');
    const password = ref('');
    const rememberMe = ref(false);
</script>

<template>
    <div class="login-page">
        <div class="title__suptitle">Добро пожаловать!</div>
        <UiTitle tag="h1" class="title--auth" mb="85">Войдите в свой аккаунт</UiTitle>
        <UiInput
            id="email"
            v-model="email"
            type="text"
            name="email"
            variant="gray"
            placeholder="E-mail"
            label="E-mail"
        />
        <UiInput
            id="password"
            v-model="password"
            type="text"
            name="password"
            variant="gray"
            placeholder="Пароль"
            label="Пароль"
            mb="24"
        />
        <div class="login-page__wrap">
            <UiCheckbox
                v-model="rememberMe"
                name="agreePolicy"
                type="checkbox"
            >
                Запомнить меня
            </UiCheckbox>
            <UiButton
                type="nuxt-link"
                to="/auth/forgot-password"
                class="login-page__forgot"
            >
                Забыли пароль?
            </UiButton>
        </div>
        <UiButton type="button" @click="login(email, password, rememberMe)">
            Войти
        </UiButton>
    </div>
</template>

<style lang="scss" scoped>
    .login-page {
        &__wrap {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        &__forgot {
            font-size: 18px;
            line-height: 100%;
            color: var(--cl-sandy-brown);
        }
    }
</style>