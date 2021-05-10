<template>
  <div class="flex p-5 bg-blue-400 text-white">
    <img
      class="max-w-lg w-60 h-60 border"
      :alt="imageAlt"
      :src="imageUrl"
    >
    <div class="flex-1 ml-5">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    imageUrl: {
      type: String,
      default: ''
    },
    imageAlt: {
      type: String,
      default: ''
    }
  },
  setup (props) {
    return {
    }
  }
}
</script>

<style>

</style>
