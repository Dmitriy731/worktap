<script setup lang="ts">
  import { useAttrs } from 'vue'

  const props = defineProps<{
    mb?: string,
    variant: 'gray' | 'search',
    label?: string,
    id?: string,
  }>();

  defineOptions({ inheritAttrs: false })

  const data = defineModel<string>()
  const attrs = useAttrs()
</script>

<template>
  <div
    :class="['input-'+props.variant, mb ? 'input--mb'+mb : '']"
    :style="props.mb ? { marginBottom: props.mb+'px' } : undefined"
  >
    <label :for="id" :class="`input-${props.variant}__label`">{{ label }}</label>
    <input v-bind="attrs" :id="id" v-model="data" :class='`input-${props.variant}__field`' >
    <slot />
  </div>
</template>

<style lang="scss" scoped>
    .input-gray {
      display: flex;
      flex-direction: column;
      gap: 18px;
      margin-bottom: 40px;

      &__label {
        font-weight: 500;
        font-size: 18px;
        line-height: 100%;
        color: var(--cl-nero);
      }

      &__field {
        font-family: 'Montserrat';
        font-weight: 500;
        font-size: 16px;
        line-height: 100%;
        padding: 0px 20px 10px 20px;
        border: none;
        border-bottom: 1px solid var(--cl-ghost-white);

        &:focus {
          outline: none;
        }

        &::placeholder {
          color: #B0AAD0;
        }
      }
    }

    .input-search {
      display: flex;
      flex-direction: column;
      margin-bottom: 20px;

      &__field {
        font-family: 'Montserrat';
        font-weight: 500;
        font-size: 16px;
        line-height: 100%;
        padding: 20px;
        background-color: var(--cl-ghost-white-second);
        border-radius: 50px;
        border: none;

        &:focus {
          outline: none;
        }

        &::placeholder {
          color: var(--cl-kimberly);
        }
      }
    }
</style>