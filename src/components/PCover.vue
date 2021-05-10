<template>
  <div class="flex p-5 bg-blue-400 text-white">
    <img
      class="max-w-lg w-60 border"
      :alt="imageAlt"
      :src="imageUrl"
    >
    <div class="flex-1 ml-5">
      <div>{{ author }}</div>
      <div class="text-2xl font-medium">
        {{ title }}
      </div>
      <p class="whitespace-pre-wrap mt-3 max-w">
        {{ description }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    author: {
      type: String,
      default: ''
    },
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
