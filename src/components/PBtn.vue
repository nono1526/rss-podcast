<template>
  <button
    class="focus:outline-none"
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
    }
  },
  setup (props) {
    const getClasses = () => {
      let classes = ''
      if (props.icon) {
        classes += 'rounded-full p-1 bg-white border transform hover:scale-110 transition transition-transform'
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

</style>
