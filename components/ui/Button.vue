<script setup lang="ts">
    import { NuxtLink } from '#components'

    const props = defineProps<{
        type?: 'a' | 'nuxt-link' | 'button' | 'div';
        theme?: 'primary' | 'secondary' | 'tertiary' | 'danger';
        size?: 'sm' | 'md' | 'lg';
    }>();
</script>

<template>
    <component
        v-bind="$attrs"
        :is="props.type === 'nuxt-link' ? NuxtLink : props.type"
        :class="`button button--${props.theme} button--${props.size}`"
    >
        <slot />
    </component>
</template>

<style lang="scss" scoped>
    .button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 18px 80px;
        border: none;
        background-color: transparent;
        text-decoration: none;
        color: #656084;

        cursor: pointer;

        &--primary {
            // background-color: var(--color-primary);
            // color: var(--color-white);
        }
    }
</style>