<script setup lang="ts">
</script>

<template>
    <div>
        <UiTitle type="h1" style="color: red">UI Kit</UiTitle>

        <UiTitle type="h2" style="color: red">Titles</UiTitle>
            <UiTitle type="h1">Покупайте фриланс-услуги в <span>два клика</span></UiTitle>
            <UiTitle type="h1">Мой <span class="orange">кошелек</span></UiTitle>
            <UiTitle type="h2">Title h2</UiTitle>
            <UiTitle type="h3" align="center" mb="24">Title h3 center</UiTitle>

        <UiTitle type="h2" style="color: red">Icons</UiTitle>
            <div style="display: flex; flex-wrap: wrap; gap: 1rem;">
                <Icon name="icon:settings" class="test-icon" />
            </div>

        <UiTitle type="h2" style="color: red">Buttons</UiTitle>
            <UiButton
                type="a"
                href="https://nuxt.com/"
                size="sm"
                theme="primary"
            >
                link
            </UiButton>
            <UiButton
                type="nuxt-link"
                size="sm"
                theme="primary"
            >
                nuxt-link
            </UiButton>
            <UiButton
                type="button"
                size="sm"
                theme="primary"
            >
                Button
            </UiButton>
            <UiButton
                type="div"
                size="sm"
                theme="primary"
            >
                div
            </UiButton>
        <UiTitle type="h2" style="color: red">Forms</UiTitle>
        <UiTitle type="h2" style="color: red">Tables</UiTitle>
        <UiTitle type="h2" style="color: red">Sliders</UiTitle>
        <UiTitle type="h2" style="color: red">Pagination</UiTitle>
        <UiTitle type="h2" style="color: red">Cards</UiTitle>

    </div>
</template>


<style lang="scss" scoped>
    .test-icon {
        font-size: 20px;
        color: #656084;
    }
</style>