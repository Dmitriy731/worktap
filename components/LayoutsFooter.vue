<script setup lang="ts">
const props = defineProps<{
  footer: any;
}>();

const year = new Date().getFullYear();
</script>

<template>
  <footer class="footer">
    <div class="footer__list">
      <div
        v-for="item in props.footer.navFooter"
        :key="item.title"
        class="footer__list-item"
      >
        <div class="footer__item-title">{{ item.title }}</div>
        <UiButton
          v-for="link in item.list" :key="link.name"
          type="nuxt-link"
          :to="link.path"
          class="footer__item-link"
          :title="link.name"
        >
          {{ link.name }}
        </UiButton>
      </div>
    </div>
    <div class="footer__socials">
      <div class="footer__item-title">{{ footer.socials.title }}</div>
      <UiButton
        v-for="link in footer.socials.list" :key="link.icon"
        type="a"
        :to="link.link"
        class="footer__item-social"
        :area-label="link.icon"
        :title="link.icon"
      >
        <Icon :name="`icon:${link.icon}`" />
      </UiButton>
    </div>
    <div class="footer__copyright">
      Copyright @ {{ year }}  |  WorkTap – Worktap.KZ. All Rights Reserved
    </div>
  </footer>
</template>

<style scoped lang="scss">
  .footer {
    @include container;
    display: grid;
    grid-template-columns: 1fr 300px;
    gap: 50px 100px;
    padding-bottom: 100px;
    padding-top: 50px;
    background-color: var(--cl-ghost-white);

    &__list {
      display: flex;
      justify-content: space-between;
      gap: 50px;
    }

    &__list-item {
      width: calc(100% / 3);

      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
    }

    &__item-title {
      font-weight: 700;
      font-size: 24px;
      line-height: 100%;
      margin-bottom: 30px;
      color: var(--cl-nero);
      width: 100%;
    }

    &__socials {
      display: flex;
      flex-wrap: wrap;
      align-content: flex-start;
      gap: 30px;
    }

    &__item-social {
      font-size: 50px;
    }

    &__copyright {
      font-size: 16px;
      color: var(--cl-nero);
      text-align: center;
      grid-column: 1/3;
    }
  }
</style>