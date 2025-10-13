<script setup lang="ts">
</script>

<template>
    <div>
        <UiTitle tag="h1" style="color: red">UI Kit</UiTitle>

        <UiTitle tag="h2" style="color: red">Titles</UiTitle>
            <UiTitle tag="h1" type="h1">Покупайте фриланс-услуги в <span>два клика</span></UiTitle>
            <UiTitle tag="h1" type="h1">Мой <span class="orange">кошелек</span></UiTitle>
            <UiTitle tag="h2" type="h2">Title h2</UiTitle>
            <UiTitle tag="h3" type="h3" align="center" mb="24">Title h3 center</UiTitle>

        <br>
        <br>
        <UiTitle tag="h2" style="color: red">Icons</UiTitle>
            <div style="display: flex; flex-wrap: wrap; gap: 1rem;">
                <Icon name="icon:settings" class="test-icon" />
            </div>

        <br>
        <br>
        <UiTitle tag="h2" style="color: red">Buttons</UiTitle>
            <UiButton
                type="a"
                href="https://nuxt.com/"
            >
                link
            </UiButton>

            <br>
            <UiButton
                type="a"
                href="https://nuxt.com/"
                theme="primary"
            >
                link
            </UiButton>

            <br>
            <UiButton
                type="a"
                href="https://nuxt.com/"
                theme="secondary"
            >
                link
            </UiButton>

            <br>
            <UiButton
                type="a"
                href="https://nuxt.com/"
                theme="tertiary"
            >
                link
            </UiButton>
            <UiButton
                to="/about"
                type="nuxt-link"
                theme="tertiary"
            >
                nuxt-link
            </UiButton>
            <UiButton
                type="button"
                theme="tertiary"
                @click="() => console.log('click')"
            >
                Button
            </UiButton>
            <UiButton
                type="div"
                theme="tertiary"
            >
                div
            </UiButton>

        <br>
        <br>
        <UiTitle tag="h2" style="color: red">Forms</UiTitle>

        <br>
        <br>
        <UiTitle tag="h2" style="color: red">Tables</UiTitle>

        <br>
        <br>
        <UiTitle tag="h2" style="color: red">Sliders</UiTitle>

        <br>
        <br>
        <UiTitle tag="h2" style="color: red">Pagination</UiTitle>

        <br>
        <br>
        <UiTitle tag="h2" style="color: red">Cards</UiTitle>

    </div>
</template>


<style lang="scss" scoped>
    .test-icon {
        font-size: 20px;
        color: #656084;
    }
</style>