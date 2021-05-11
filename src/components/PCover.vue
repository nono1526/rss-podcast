<template>
  <div class="flex p-5 text-white bg-gradient-to-r from-blue-500 to-green-300 ">
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
