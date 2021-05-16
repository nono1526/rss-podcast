<template>
  <button
    :disabled="disabled"
    class="p-btn focus:outline-none"
    :class="getClasses()"
  >
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    icon: {
      type: Boolean,
      default: false
    },
    fab: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup (props) {
    const getClasses = () => {
      let classes = ''
      if (props.fab) {
        classes += 'p-btn--fab '
      }
      if (props.icon) {
        classes += 'p-btn--icon '
      }
      if (props.disabled) {
        classes += 'p-btn--disabled '
      }
      return classes.split(' ')
    }
    return {
      getClasses
    }
  }
}
</script>

<style>
.p-btn.p-btn--disabled:disabled svg {
  fill: rgb(215, 215, 215)
}

.p-btn.p-btn--fab {
  @apply rounded-full p-1 bg-white border transform hover:scale-110 transition transition-transform;
}

.p-btn.p-btn--icon {
  @apply p-1
}

</style>
