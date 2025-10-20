<script setup lang="ts">
    import { useRouter } from 'vue-router'
    import { useAuthStore } from '~/stores/auth'

    interface NavItem {
        name: string;
        path: string;
    }

    const props = defineProps<{ nav?: NavItem[] }>()
    const auth = useAuthStore()
    const router = useRouter()

    const logout = async () => {
        auth.user = null
        const token = useCookie('token')
        token.value = null

        await $fetch('/api/auth/logout', { method: 'POST' }).catch(() => {})

        // Редирект на страницу логина в твоём приложении
        router.push('/auth/login')
    }
</script>

<template>
    <header class="header">
        <Logo />
        <nav class="header__nav">
            <UiButton
                v-for="item in props.nav"
                :key="item.path"
                type="nuxt-link"
                :to="item.path"
                class="header__nav-item"
            >
                {{item.name}}
            </UiButton>
            <UiButton
                type="nuxt-link"
                to="/todo"
                class="header__nav-item"
            >
                todo
            </UiButton>
        </nav>
        <div v-if="true" class="header__auth">
            <UiButton
                type="nuxt-link"
                to="/auth/register"
                theme="tertiary"
            >
                Регистрация
            </UiButton>
            <UiButton
                type="nuxt-link"
                to="/auth/login"
                theme="secondary"
            >
                Войти
            </UiButton>
            <UiButton
                type="button"
                theme="secondary"
                @click="logout"
            >
                Выйти
            </UiButton>
        </div>
        <div v-else>
            auth
        </div>
    </header>
</template>

<style scoped lang="scss">
    .header {
        @include container;

        display: flex;
        align-items: center;
        gap: 60px;
        min-height: 80px;
        padding-top: 30px;

        &__nav {
            margin-right: auto;

            display: flex;
            align-items: center;
            gap: 40px;
        }

        &__nav-item {
            font-weight: 500;
            font-size: 16px;
            line-height: 100%;
            color: var(--cl-nero);

            @media (hover: none), (pointer: coarse) {
                &:active {
                    color: var(--cl-nero);
                }
            }

            @media not all and (pointer: coarse) {
                &:hover {
                    color: var(--cl-nero);
                }
            }
        }

        &__auth {
            display: flex;
            align-items: center;
            gap: 30px;
        }
    }
</style>