<template>
    <LayoutsHeader></LayoutsHeader>
    <slot />
    <LayoutsFooter></LayoutsFooter>
</template>

<style lang="scss">
    .app {
        @include container;
    }
</style>