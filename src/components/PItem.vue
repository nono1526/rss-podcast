<template>
  <div
    class="shadow my-8 p-5 bg-white cursor-pointer hover:shadow-lg transition-all duration-500"
    @click="$emit('click', $event)"
  >
    <div class="flex">
      <img
        :src="imageUrl"
        class="w-14 h-14 border"
      >
      <slot name="head" />
    </div>
    <p class="max-h-20 line-clamp-3 max-w-full my-5">
      <slot name="body" />
    </p>
    <div class="text-gray-400">
      <slot name="footer" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    imageUrl: {
      type: String,
      default: ''
    }
  },
  emits: ['click']
}
</script>

<style>

</style>
