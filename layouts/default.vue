<script setup lang="ts">
  const navHeader = [
    {
      name: 'Биржа',
      path: '/exchange'
    },
    {
      name: 'Ворки',
      path: '/works'
    },
    {
      name: 'Конкурсы',
      path: '/competitions'
    },
    {
      name: 'Создать ворк',
      path: '/create-work'
    },
    {
      name: 'Создать заказ',
      path: '/create-order'
    }
  ]

  const footer = {
    navFooter: [
      {
          title: 'Топ категории',
          list: [
              {
                  name: 'Тексты и переводы',
                  path: '/'
              },
              {
                  name: 'Разработка',
                  path: '/'
              },
              {
                  name: 'Дизайн',
                  path: '/'
              },
              {
                  name: 'Аудио, видео монтаж',
                  path: '/'
              },
              {
                  name: 'Соцсети и реклама',
                  path: '/'
              },
              {
                  name: 'Бизнес и жизнь',
                  path: '/'
              },
              {
                  name: 'SEO и оптимизация',
                  path: '/'
              },
          ]
      },
      {
          title: 'О Проекте',
          list: [
              {
                  name: 'О Нас',
                  path: '/'
              },
              {
                  name: 'Как Это Работает',
                  path: '/'
              },
              {
                  name: 'Политика Приватности',
                  path: '/'
              },
              {
                  name: 'Правила Пользования',
                  path: '/'
              },
              {
                  name: 'Пресса о нас',
                  path: '/'
              }
          ]
      },
      {
          title: 'Поддержка',
          list: [
              {
                  name: 'Контакты',
                  path: '/'
              },
              {
                  name: 'Политика Безопасности',
                  path: '/'
              },
              {
                  name: 'FAQ',
                  path: '/'
              },
          ]
      }
    ],
    socials: {
      title: 'Follow',
      list: [
        {
          icon: 'facebook',
          link: 'https://www.facebook.com/'
        },
        {
          icon: 'twitter',
          link: 'https://twitter.com/'
        },
        {
          icon: 'instagram',
          link: 'https://instagram.com/'
        },
        {
          icon: 'linkedin',
          link: 'https://linkedin.com/'
        },
      ]
    }
  }
</script>

<template>
    <div class="app">
        <LayoutsHeader :nav="navHeader" />
        <slot />
        <LayoutsFooter :footer="footer" />
    </div>
</template>

<style lang="scss">
    .app {
        flex-grow: 1;

        display: flex;
        flex-direction: column;
    }
</style>