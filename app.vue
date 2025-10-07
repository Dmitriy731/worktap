<script scoped lang="ts"></script>

<template>
  <NuxtLayout>
    <main class="main">
      <NuxtPage
        :transition="{
          name: 'page',
          mode: 'out-in',
        }"
      />
    </main>
  </NuxtLayout>
</template>

<style lang="scss">
  .main {
    height: fit-content;
    @include container;
    flex-grow: 1;
  }

  .page {
    &-enter-from,
    &-leave-to {
      opacity: 0;
    }

    &-enter-active,
    &-leave-active {
      transition: opacity 0.3s;
    }
  }
</style>