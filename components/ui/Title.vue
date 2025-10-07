<script setup lang="ts">
    const props = defineProps<{
        type?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
        mb?: string;
        align?: 'left' | 'center' | 'right';
    }>();
</script>

<template>
    <component
        :is="props.type"
        :class="[
            'title',
            props.type && `title--${props.type}`,
            props.align && `title--${props.align}`,
            props.mb && `title--mb-${props.mb}`
        ]"
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
    }
</style>