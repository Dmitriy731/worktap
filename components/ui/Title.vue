<script setup lang="ts">
    const props = defineProps<{
        tag: 'h1' | 'h2' | 'h3';
        type?: 'h1' | 'h2' | 'h3';
        mb?: string;
        align?: 'left' | 'center' | 'right';
    }>();
</script>

<template>
    <component
        :is="props.tag"
        :class="[
            'title',
            `title--${props.type ? props.type : props.tag}`,
            props.align && `title--${props.align}`,
        ]"
        :style="props.mb ? { marginBottom: props.mb+'px' } : undefined"
    >
        <slot />
    </component>
</template>

<style lang="scss">
    .title {
        font-family: 'Montserrat';
        font-weight: 700;
        margin: 0;
        color: var(--cl-nero);

        &--h1 {
            font-size: 36px;
            line-height: 100%;
            margin-bottom: 30px;

            & span {
                color: var(--cl-mountain-meadow);

                &.orange {
                    color: var(--cl-sandy-brown);
                }
            }
        }

        &--h2 {
            font-weight: 600;
            font-size: 24px;
            line-height: 100%;
            margin-bottom: 40px;
        }

        &--left   { text-align: left; }
        &--center { text-align: center; }
        &--right  { text-align: right; }

        &--auth {
            font-size: 30px;
            line-height: 100%;
            color: var(--cl-black-russian);
        }

        &__suptitle {
            font-size: 16px;
            line-height: 100%;
            color: var(--cl-licorice);
            margin-bottom: 1px;
        }
    }
</style>