<script setup lang="ts">
interface Props {
    checked?: boolean
    disabled?: boolean
    name: string
    value?: string
    type?: string
}

withDefaults(defineProps<Props>(), {
    checked: false,
    disabled: false,
})

const modelValue = defineModel()
</script>

<template>
    <div class="checked">
        <label class="checked__label">
            <input
                v-model="modelValue"
                :type="type"
                :checked="checked"
                :disabled="disabled"
                :name="name"
                :value="value"
                class="checked__field"
            >
            <span class="checked__content">
                <slot />
            </span>
        </label>

        <div v-if="error" class="checked__error">
            {{ error }}
        </div>
    </div>
</template>

<style lang="scss" scoped>
  .checked {
    display: flex;
    gap: 8px;

    &:has(input:checked) {
      .checked__label {
        &::before {
          border-width: 12px;
        }
      }
    }

    &__label {
      position: relative;
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      min-height: 24px;

      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 24px;
        height: 24px;
        border: 2px solid var(--cl-wistful);
        border-radius: 100%;
        background-color: transparent;
        transition: border-width 0.3s;
      }
    }

    &__field {
      position: absolute;
      opacity: 0;
      left: 0;
      top: 0;
      width: 0;
      height: 0;
    }

    &__content {
      display: flex;
      padding-left: 32px;

      font-size: 18px;
      line-height: 100%;
    }
  }
</style>
