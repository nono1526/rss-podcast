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
    <div class="flex-1 flex flex-col">
      <div class="w-6/12 mx-auto text-center ">
        music manual
      </div>
      <div class="h-1 shadow w-6/12 mx-auto rounded relative">
        <div
          class="h-full absolute bg-red-400"
          :style="{
            width: `${played * 100}%`
          }"
        />
        <div
          class="h-3 w-3 rounded-full bg-red-400 absolute shadow transform -translate-y-2/4 top-2/4 -translate-x-2/4 cursor-pointer"
          :style="{
            left: `${played * 100}%`
          }"
        />
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
import { onMounted, watch, toRefs, reactive } from 'vue'
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
      default: false
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
    },
    currentTime: {
      type: Number,
      default: 0
    }
  },
  emits: ['update:isPlay', 'update:url', 'update:currentTime'],
  setup (props, { emit }) {
    const audio = new Audio()
    const states = reactive({
      played: 0,
      loaded: 0,
      duration: 0
    })
    audio.addEventListener('loadedmetadata', e => {
      states.duration = audio.duration
    })

    audio.addEventListener('timeupdate', e => {
      states.played = audio.currentTime / audio.duration
      states.loaded = audio.buffered.end(0) / audio.duration
      console.log(states.played * 100)
    })
    audio.addEventListener('seeking', e => {
      console.log(e, 'audio process')
    })

    // const computed(() => {

    // })
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
      toggleAudio,
      ...toRefs(states)
    }
  }
}
</script>

<style>

</style>
