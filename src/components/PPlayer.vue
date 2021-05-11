<template>
  <div
    class="fixed bottom-0 w-full bg-blue-50 border-t h-20 flex"
  >
    <img
      :src="cover"
      class="h-full"
    >

    <div class="flex flex-col h-full justify-center mx-5 text-sm">
      <div>{{ title }}</div>
      <div class="text-xs text-gray-400">
        {{ subTitle }}
      </div>
    </div>
    <div class="flex-1 flex flex-col justify-center">
      <div
        class="w-6/12 mx-auto flex items-center"
      >
        <span class="mr-3 text-gray-500 w-14 text-right text-sm">{{ playedTime }}</span>
        <div
          class="h-1 flex-1 rounded shadow cursor-pointer bg-white relative"
          @click="setCurrentTimeByClickBar"
        >
          <div
            class="h-full bg-blue-400 rounded"
            :style="{
              width: `${played * 100}%`
            }"
          />
          <div
            class="h-3 w-3 rounded-full bg-blue-500 absolute shadow-2xl transform -translate-y-2/4 top-2/4 -translate-x-2/4 cursor-pointer"
            :style="{
              left: `${played * 100}%`
            }"
          />
        </div>
        <span class="ml-3 w-14 text-gray-500 text-sm">{{ restTime }}</span>
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
import { onMounted, watch, toRefs, reactive, computed } from 'vue'
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
      emit('update:currentTime', audio.currentTime)
    })

    const setCurrentTimeByClickBar = e => {
      const x = e.layerX
      const { width } = e.currentTarget.getBoundingClientRect()
      const offsetPrecent = x / width
      audio.currentTime = audio.duration * offsetPrecent
    }

    const playedTime = computed(() => {
      const currentTimeSecs = Math.floor(props.currentTime)
      return formatDurationSecs(currentTimeSecs)
    })

    const formatDurationSecs = secs => {
      const hours = Math.floor(secs / 60 / 60)
      const minutes = Math.floor(secs / 60)
      const seconds = secs % 60
      let timeString = ''
      timeString += hours > 0 ? hours : ''
      timeString += minutes > 0
        ? minutes < 10
          ? `0${minutes}`
          : minutes
        : '00'
      timeString += ':'
      timeString += seconds > 0
        ? seconds < 10
          ? `0${seconds}`
          : seconds
        : '00'
      return timeString
    }

    const restTime = computed(() => {
      const timeSecs = Math.floor(states.duration) - Math.floor(props.currentTime)
      return formatDurationSecs(timeSecs)
    })

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
      setCurrentTimeByClickBar,
      playedTime,
      restTime,
      ...toRefs(states)
    }
  }
}
</script>

<style>

</style>
