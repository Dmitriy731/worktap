<script setup lang="ts">
    import { useRouter } from 'vue-router'
    import { useAuthStore } from '~/stores/auth'
    import { onClickOutside } from '@vueuse/core'
    import { UserRole } from '~/types/enum/user-role.enum'

    interface NavItem {
        name: string;
        path: string;
    }

    const props = defineProps<{ nav?: NavItem[], navProfile?: NavItem[] }>()
    const auth = useAuthStore()
    const router = useRouter()

    const notifications = ref(false)
    const target = ref<HTMLElement | null>(null)
    const buttonNotification = ref<HTMLElement | null>(null)

    onClickOutside(target, () => {
        notifications.value = false
    }, { ignore: [buttonNotification] })

    const profileOpenBtn = ref<HTMLElement | null>(null)
    const profileOpen = ref(false)
    const profileBody = ref<HTMLElement | null>(null)

    onClickOutside(profileBody, () => {
        profileOpen.value = false
    }, { ignore: [profileOpenBtn] })

    const logout = async () => {
        auth.user = null
        const token = useCookie('token')
        token.value = null

        await $fetch('/api/auth/logout', { method: 'POST' }).catch(() => {})
        router.push('/auth/login')
    }

    const setRole = async (role: UserRole) => {
        await auth.updateRole(role)
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
        </nav>
        <div v-if="auth.user" class="header__auth">
            <div class="header__auth-links">
                <NuxtLink to="favorite" class="header__auth-link">
                    <Icon name="icon:favorite" />
                </NuxtLink>
                <div class="header__wrapper-btn">
                    <button
                        ref="buttonNotification"
                        class="header__auth-link"
                        @click="notifications = !notifications"
                    >
                        <Icon name="icon:notification" />
                    </button>
                    <Transition>
                        <div
                            v-if="notifications"
                            ref="target"
                            class="header__auth-content"
                        >
                            <div class="header__notification">nasdasdasdasldhasjdkahskd sald ha; adshdlasj dahslsd</div>
                            <div class="header__notification">!@#$%^&*()_+</div>
                            <div class="header__notification">lsak jdala j  jda  jdal jal jdal jdals jas dsja dasl adslj dj adl dsala</div>
                        </div>
                    </Transition>
                </div>
                <NuxtLink to="chat" class="header__auth-link">
                    <Icon name="icon:chat" />
                </NuxtLink>
                <div
                    :class="['header__profile', { 'active': profileOpen }]"
                >
                    <div
                        ref="profileOpenBtn"
                        class="header__profile-head"
                        @click="profileOpen = !profileOpen"
                    >
                        <span class="header__profile-name">{{ auth.user?.firstName + ' ' + auth.user?.lastName }}</span>
                        <img class="header__profile-photo" :src="auth.user?.photo || '/images/profile-default.jpg'" alt="profile" width="80" height="80">
                        <Icon name="icon:chevron-down" class="header__profile-arrow" />
                    </div>
                    <div
                        ref="profileBody"
                        class="header__profile-body"
                    >
                        <div class="header__profile-roles">
                            <button
                                :class="['header__profile-role', { 'active': auth.user?.role === UserRole.Client }]"
                                @click="setRole(UserRole.Client)"
                                >
                                Я заказчик
                            </button>
                            <button
                                :class="['header__profile-role', { 'active': auth.user?.role === UserRole.Contractor }]"
                                @click="setRole(UserRole.Contractor)"
                                >
                                Я исполнитель
                            </button>
                        </div>
                        <UiButton
                            v-for="(item, i) in props.navProfile"
                            :key="`profile-link-${i}`"
                            type="nuxt-link"
                            :to="item.path"
                            theme="profile"
                        >
                            {{item.name}}
                        </UiButton>

                        <UiButton
                            type="button"
                            theme="profile"
                            class="red"
                            @click="logout"
                        >
                            Выйти из аккаунта
                        </UiButton>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="header__auth">
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
        min-height: 110px;

        &:has( .header__profile) {
            padding-right: calc(((100% - 1320px) / 2) + 348px);
        }

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

        &__auth-link {
            font-size: 24px;
            width: 40px;
            height: 40px;

            display: flex;
            align-items: center;
            justify-content: center;
            border: none;
            background-color: transparent;
            transition: opacity 0.3s;
            cursor: pointer;
            padding: 0;

            &:hover {
                opacity: 0.7;
            }
        }

        &__wrapper-btn {
            position: relative;
        }

        &__auth-links {
            display: flex;
            align-items: center;
            gap: 10px;
        }

        &__auth-content {
            position: absolute;
            top: calc(100% + 10px);
            left: 50%;
            padding: 20px;
            border-radius: 8px;
            min-width: 320px;
            transform: translateX(-50%);
            border: 1px solid var(--cl-shuttle-grey);
            background-color: var(--cl-white);
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

            display: flex;
            flex-direction: column;
        }

        &__notification {
            border-bottom: 1px solid var(--cl-shuttle-grey);
            padding: 8px 0;
        }

        &__profile {
            position: absolute;
            top: 10px;
            right: calc((100% - 1320px) / 2);
            width: 330px;
            padding: 20px;
            border-radius: 20px;

            display: grid;
            grid-template-rows: 80px 0fr;
            transition: grid-template-rows 0.3s, background-color 0.3s;

            &.active {
                grid-template-rows: 80px 1fr;
                background-color: var(--cl-ghost-white);
            }
        }

        &__profile-head {
            display: flex;
            align-items: center;
            gap: 16px;
            justify-content: flex-end;
            cursor: pointer;
        }

        &__profile-name {
            font-weight: 600;
            font-size: 16px;
            line-height: 18px;
            text-align: end;
        }

        &__profile-photo {
            border-radius: 50%;
        }

        &__profile-body {
            overflow: hidden;

            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
        }

        &__profile-arrow {
            font-size: 24px;
            transform: rotate(180deg);
            transition: transform 0.3s;

            .active & {
                transform: rotate(0deg);
            }
        }

        &__profile-roles  {
            position: relative;
            display: flex;
            align-items: center;
            gap: 32px;
            background-color: var(--cl-lavender);
            padding: 4px 16px;
            border-radius: 100px;
            margin-top: 20px;
            margin-bottom: 10px;
            z-index: 1;

            &::before {
                content: '';
                position: absolute;
                height: 33px;
                width: 114px;
                background-color: var(--cl-sandy-brown);
                z-index: -1;
                left: 0;
                top: 50%;
                transform: translateY(-50%);
                border-radius: 20px;

                transition: left 0.3s, transform 0.3s, width 0.3s;
            }

            &:has(:last-child.active) {
                &::before {
                    left: 100%;
                    transform: translate(-100%, -50%);
                    width: 143px;
                }
            }
        }

        &__profile-role {
            font-family: 'Montserrat';
            border: none;
            background-color: transparent;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            padding: 0;

            transition: color 0.3s, font-weight 0.3s;

            &.active {
                color: var(--cl-white);
            }
        }
    }
</style>