<script setup lang="ts">
  import Logo from '~/components/Logo.vue';
  import SliderAuth from '~/components/SliderAuth.vue';
</script>

<template>
    <div class="app-auth">
        <div class="app-auth__wrapper">
          <Logo class="app-auth__logo" />
          <slot />
        </div>
        <SliderAuth />
    </div>
</template>

<style lang="scss">
    .app-auth {
      @include container;
      position: relative;
      display: grid;
      grid-template-columns: 50% 50%;
      height: 100%;
      align-items: center;

      &__wrapper {
        padding-right: 150px;
      }

      &__logo {
        position: absolute;
        top: 20px;
      }
    }
</style>