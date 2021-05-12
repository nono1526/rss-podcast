<template>
  <div
    class="bottom-0 w-full bg-blue-50 border-t h-20 flex"
    :class="{
      hidden: !visible,
      fixed: fixed
    }"
  >
    <img
      :src="cover"
      class="h-full cursor-pointer"
      @click="$emit('click:info')"
    >
    <div
      class="flex flex-col h-full justify-center mx-5 text-sm w-48 cursor-pointer"
      @click="$emit('click:info')"
    >
      <div class="truncate">
        {{ title }}
      </div>
      <div class="text-xs text-gray-400 truncate">
        {{ subTitle }}
      </div>
    </div>
    <div class="flex-1 flex flex-col justify-center">
      <div
        class="w-7/12 mx-auto"
      >
        <div class="flex">
          <PBtn
            icon
            :disabled="!hasNext"
            @click="$emit('click:next')"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
            ><path
              d="M0 0h24v24H0V0z"
              fill="none"
            /><path d="M6 6h2v12H6zm3.5 6l8.5 6V6l-8.5 6zm6.5 2.14L12.97 12 16 9.86v4.28z" /></svg>
          </PBtn>
          <PBtn
            fab
            class="mx-auto"
            @click="toggleAudioPlayState"
          >
            <PlayIcon
              :show-pause="isPlay"
            />
          </PBtn>
          <PBtn
            :disabled="!hasPrev"
            icon
            @click="$emit('click:prev')"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
            ><path
              d="M0 0h24v24H0V0z"
              fill="none"
            /><path d="M6 18l8.5-6L6 6v12zm2-8.14L11.03 12 8 14.14V9.86zM16 6h2v12h-2z" /></svg>
          </PBtn>
        </div>
        <div class="w-full flex items-center">
          <span class="mr-3 text-gray-500 w-14 text-right text-sm">{{ playedTime }}</span>
          <PSlider
            :value="currentTime"
            :max="duration"
            @input="$emit('update:currentTime', $event)"
            @dragstart="dragstart"
            @dragend="dragend"
          />
          <span class="ml-3 w-14 text-gray-500 text-sm">{{ restTime }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, watch, toRefs, reactive, computed, onUnmounted } from 'vue'
import PSlider from '@src/components/PSlider.vue'
import PlayIcon from '@src/components/PlayIcon.vue'
import PBtn from '@src/components/PBtn.vue'

export default {
  components: {
    PSlider,
    PlayIcon,
    PBtn
  },
  props: {
    hasPrev: {
      type: Boolean,
      default: false
    },
    hasNext: {
      type: Boolean,
      default: false
    },
    audioElement: {
      type: Audio,
      default: null
    },
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
    },
    fixed: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:isPlay', 'update:url', 'update:currentTime', 'update:visible', 'click:prev', 'click:next', 'click:info'],
  setup (props, { emit }) {
    let audio
    let isDragging = false
    const states = reactive({
      played: 0,
      loaded: 0,
      duration: 0,
      isLoading: false
    })

    const onLoadmetadata = () => {
      states.duration = audio.duration
    }

    const emitVisible = visible => {
      emit('update:visible', visible)
    }

    const showPlayer = () => emitVisible(true)

    const onTimeUpdate = e => {
      states.played = audio.currentTime / audio.duration
      states.isLoading = false
      if (isDragging) return
      emit('update:currentTime', audio.currentTime)
    }

    const bindAudioEvents = () => {
      audio.addEventListener('loadedmetadata', onLoadmetadata)
      audio.addEventListener('loadeddata', showPlayer)
      audio.addEventListener('timeupdate', onTimeUpdate)
    }

    const unBindAudioEvents = () => {
      audio.removeEventListener('loadedmetadata', onLoadmetadata)
      audio.removeEventListener('loadeddata', showPlayer)
      audio.removeEventListener('timeupdate', onTimeUpdate)
    }

    const setAudioCurrentTime = currentTime => {
      audio.currentTime = currentTime
    }

    const dragend = e => {
      if (!isDragging) return
      setAudioCurrentTime(props.currentTime)
      states.isLoading = true
      isDragging = false
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
      states.isLoading = true
      showPlayer()
      audio.play()
      emit('update:url', url)
      emit('update:isPlay', true)
    })

    watch(() => props.isPlay, isPlay => {
      isPlay ? audio.play() : audio.pause()
    })

    const toggleAudioPlayState = () => {
      const isPlay = props.isPlay
      emit('update:isPlay', !isPlay)
    }

    const dragstart = () => {
      isDragging = true
    }

    onMounted(() => {
      audio = props.audioElement || new Audio()
      bindAudioEvents()
    })

    onUnmounted(() => {
      unBindAudioEvents()
    })
    return {
      toggleAudioPlayState,
      dragend,
      playedTime,
      restTime,
      dragstart,
      ...toRefs(states)
    }
  }
}
</script>

<style>

</style>
