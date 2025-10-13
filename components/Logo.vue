<script setup lang="ts">
    import { useRoute } from '#app'
    import { NuxtLink } from '#components'

    const route = useRoute()

    const isHome = computed(() => route.path === '/')
</script>

<template>
    <component
        :is="isHome ? 'div' : NuxtLink"
        class="logo"
        :to="isHome ? '' : '/'"
    >
        <img src="/images/inhtml/logo/logo.svg" alt="logo" width="195" height="40">
    </component>
</template>

<style scoped lang="scss">
    .logo {

    }
</style>