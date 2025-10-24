<script setup lang="ts">
    import { NuxtLink } from '#components'

    const props = defineProps<{
        type?: 'a' | 'nuxt-link' | 'button' | 'div';
        theme?: 'primary' | 'secondary' | 'tertiary' | 'profile';
    }>();
</script>

<template>
    <component
        v-bind="$attrs"
        :is="props.type === 'nuxt-link' ? NuxtLink : props.type"
        :prefetch-on="props.type === 'nuxt-link' ? 'interaction' : undefined"
        :class="
            `button
            ${props.theme ? 'button--'+props.theme : ''}`
        "
    >
        <slot />
    </component>
</template>

<style lang="scss" scoped>
    .button {
        all: unset;
        font-weight: 400;
        font-size: 14px;
        line-height: 100%;
        text-decoration: none;
        color: var(--cl-nero);

        display: inline-flex;
        align-items: center;
        justify-content: center;

        border: none;
        background-color: transparent;

        cursor: pointer;

        transition: color 0.3s, opacity 0.3s;

        @media (hover: none), (pointer: coarse) {
            &:active {
                color: var(--cl-black);
                opacity: 0.7;
            }
        }

        @media not all and (pointer: coarse) {
            &:hover {
                color: var(--cl-black);
                opacity: 0.7;
            }
        }

        &--primary {
            font-weight: 500;
            padding: 10px 30px;
            border: 1px solid var(--cl-mountain-meadow);
            color: var(--cl-mountain-meadow);
            border-radius: 50px;
            transition: background-color 0.3s, color 0.3s;

            @media (hover: none), (pointer: coarse) {
                &:active {
                    background-color: var(--cl-mountain-meadow);
                    color: var(--cl-alice-blue);
                    opacity: 1;
                }
            }

            @media not all and (pointer: coarse) {
                &:hover {
                    background-color: var(--cl-mountain-meadow);
                    color: var(--cl-alice-blue);
                    opacity: 1;
                }
            }
        }

        &--secondary {
            font-weight: 600;
            font-size: 16px;
            line-height: 100%;

            padding: 10px 30px;
            color: var(--cl-alice-blue);
            background-color:  var(--cl-mountain-meadow);
            border-radius: 50px;
            transition: background-color 0.3s, color 0.3s;

            @media (hover: none), (pointer: coarse) {
                &:active {
                    background-color: var(--cl-salem);
                    color: var(--cl-alice-blue);
                    opacity: 1;
                }
            }
            @media not all and (pointer: coarse) {
                &:hover {
                    background-color: var(--cl-salem);
                    color: var(--cl-alice-blue);
                    opacity: 1;
                }
            }
        }

        &--tertiary {
            font-weight: 600;
            font-size: 16px;
            line-height: 100%;

            padding: 10px 30px;
            color:  var(--cl-mountain-meadow);
            background-color: var(--cl-ghost-white);
            border-radius: 50px;
            transition: background-color 0.3s, color 0.3s;

            @media (hover: none), (pointer: coarse) {
                &:active {
                    background-color: var(--cl-mountain-meadow);
                    color:  var(--cl-alice-blue);
                    opacity: 1;
                }
            }
            @media not all and (pointer: coarse) {
                &:hover {
                    background-color: var(--cl-mountain-meadow);
                    color:  var(--cl-alice-blue);
                    opacity: 1;
                }
            }
        }

        &--profile {
            font-size: 16px;
            line-height: 20px;
            width: fit-content;
        }

        &.red {
            color: var(--cl-coral-red);
        }
    }
</style>