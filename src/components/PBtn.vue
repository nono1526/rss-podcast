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
        classes += 'rounded-full p-1 bg-white border transform hover:scale-110 transition transition-transform '
      }
      if (props.icon) {
        classes += 'rounded-full p-1 transform '
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
.p-btn:disabled svg {
  fill: rgb(215, 215, 215)
}
</style>
