<template>
  <div
    class="fixed bottom-0 w-full bg-white border-t h-20 flex"
  >
    <img
      :src="cover"
      class="h-full"
    >

    <div class="flex flex-col h-full justify-center mx-5 text-sm">
      <div>{{ title }}</div>
      <div class="text-gray-400 text-xs">
        {{ subTitle }}
      </div>
    </div>
    <button
      class="border p-5"
      @click="toggleAudio"
    >
      Pause
    </button>
  </div>
</template>

<script>
import { onMounted, watch } from 'vue'
export default {
  props: {
    url: {
      type: String,
      default: ''
    },
    cover: {
      type: String,
      default: ''
    },
    isPlay: {
      type: Boolean,
      default: ''
    },
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    subTitle: {
      type: String,
      default: ''
    }
  },
  emits: ['update:isPlay', 'update:url'],
  setup (props, { emit }) {
    const audio = new Audio()
    // audio.addEventListener()
    watch(() => props.url, url => {
      audio.src = url
      audio.currentTime = 0
      audio.play()
      emit('update:url', url)
      emit('update:isPlay', true)
    })

    watch(() => props.isPlay, isPlay => {
      isPlay ? audio.play() : audio.pause()
      emit('update:isPlay', isPlay)
    })

    const toggleAudio = () => {
      const isPlay = props.isPlay
      if (isPlay) {
        audio.pause()
      } else {
        audio.play()
      }
      emit('update:isPlay', !isPlay)
    }

    onMounted(() => {
      console.log(audio)
    })
    return {
      toggleAudio
    }
  }
}
</script>

<style>

</style>
