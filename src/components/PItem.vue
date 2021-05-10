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
      <div class="flex-1 ml-5 flex flex-col justify-center">
        <h5 class="">
          {{ title }}
        </h5>
        <div class="text-sm text-gray-400">
          {{ author }}
        </div>
      </div>
    </div>
    <p class="max-h-20 line-clamp-3 max-w-full my-5">
      {{ description }}
    </p>
    <div class="text-gray-400">
      <span>{{ createDate }} · {{ showMinutesDuration }}</span>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
export default {
  props: {
    imageUrl: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    author: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    createAt: {
      type: [Date, String],
      default: ''
    },
    duration: {
      type: Number,
      default: 0
    },
    audioUrl: {
      type: String,
      default: ''
    }
  },
  emits: ['click'],
  setup (props) {
    const createDate = computed(() => {
      const date = new Date(props.createAt)
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    })
    const showMinutesDuration = computed(() => {
      const minutes = Math.floor(props.duration / 60)
      return `${minutes} 分鐘`
    })
    return {
      createDate,
      showMinutesDuration
    }
  }
}
</script>

<style>

</style>
