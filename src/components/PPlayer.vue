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
      @click="$emit('click:cover')"
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
        class="w-8/12 mx-auto"
      >
        <div class="flex">
          <PBtn
            icon
            :disabled="!hasNext"
            data-test="next-btn"
            @click="$emit('click:next', e)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="#515151"
            ><path
              d="M0 0h24v24H0V0z"
              fill="none"
            /><path d="M6 6h2v12H6zm3.5 6l8.5 6V6l-8.5 6zm6.5 2.14L12.97 12 16 9.86v4.28z" /></svg>
          </PBtn>
          <PBtn
            icon
            data-test="replay-10-btn"
            @click="setAudioCurrentTime(currentTime - 10)"
          >
            <ReplayIcon />
          </PBtn>
          <PBtn
            fab
            class="mx-auto"
            data-test="play-btn"
            @click="toggleAudioPlayState"
          >
            <PlayIcon
              :show-pause="isPlaying"
            />
          </PBtn>
          <PBtn
            icon
            data-test="quick-10-btn"
            @click="setAudioCurrentTime(currentTime + 10)"
          >
            <ReplayIcon
              fast-forward
            />
          </PBtn>
          <PBtn
            :disabled="!hasPrev"
            data-test="prev-btn"
            icon
            @click="$emit('click:prev', e)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="#515151"
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
    <div class="w-36 flex items-center mr-5">
      <svg
        class="mx-2"
        xmlns="http://www.w3.org/2000/svg"
        height="32px"
        viewBox="0 0 24 24"
        width="32px"
        fill="#515151"
      ><path
        d="M0 0h24v24H0V0z"
        fill="none"
      /><path d="M14 8.83v6.34L11.83 13H9v-2h2.83L14 8.83M16 4l-5 5H7v6h4l5 5V4z" /></svg>
      <PSlider
        :value="volume"
        data-test="volume-slider"
        @input="setVolume"
      />
      <svg
        class="mx-2"
        xmlns="http://www.w3.org/2000/svg"
        height="32px"
        viewBox="0 0 24 24"
        width="32px"
        fill="#515151"
      ><path
        d="M0 0h24v24H0V0z"
        fill="none"
      /><path d="M3 9v6h4l5 5V4L7 9H3zm7-.17v6.34L7.83 13H5v-2h2.83L10 8.83zM16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77 0-4.28-2.99-7.86-7-8.77z" /></svg>
    </div>
  </div>
</template>

<script>
import { onMounted, watch, toRefs, reactive, computed, onUnmounted } from 'vue'
import PSlider from '@src/components/PSlider.vue'
import PlayIcon from '@src/components/PlayIcon.vue'
import PBtn from '@src/components/PBtn.vue'
import ReplayIcon from '@src/components/ReplayIcon.vue'

export default {
  components: {
    PSlider,
    PlayIcon,
    PBtn,
    ReplayIcon
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
    isPlaying: {
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
  emits: ['update:isPlaying', 'update:url', 'update:currentTime', 'update:visible', 'click:prev', 'click:next', 'click:info', 'ended', 'click:cover'],
  setup (props, { emit }) {
    let audio
    let isDragging = false
    const states = reactive({
      played: 0,
      loaded: 0,
      duration: 0,
      isLoading: false,
      volume: 50
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
    const onEnded = e => {
      emit('ended', e)
    }
    const bindAudioEvents = () => {
      audio.addEventListener('loadedmetadata', onLoadmetadata)
      audio.addEventListener('loadeddata', showPlayer)
      audio.addEventListener('timeupdate', onTimeUpdate)
      audio.addEventListener('ended', onEnded)
    }

    const unBindAudioEvents = () => {
      audio.removeEventListener('loadedmetadata', onLoadmetadata)
      audio.removeEventListener('loadeddata', showPlayer)
      audio.removeEventListener('timeupdate', onTimeUpdate)
      audio.removeEventListener('ended', onEnded)
    }

    const setAudioCurrentTime = currentTime => {
      audio.currentTime = currentTime - 0.1 // @issue 剛好有時不會觸發 ended，所以給 100ms 緩衝
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

    const formatDurationSecs = durationInSecs => {
      const time = new Date(durationInSecs * 1000).toISOString().substr(11, 8)
      const [hours, mins, secs] = time.split(':')
      return parseInt(hours) > 0
        ? [hours, mins, secs].join(':')
        : [mins, secs].join(':')
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
      emit('update:isPlaying', true)
    })

    watch(() => props.isPlaying, isPlaying => {
      isPlaying ? audio.play() : audio.pause()
    })

    const setVolume = val => {
      audio.volume = val / 100
      states.volume = val
    }

    const toggleAudioPlayState = () => {
      const isPlaying = props.isPlaying
      emit('update:isPlaying', !isPlaying)
    }

    const dragstart = () => {
      isDragging = true
    }

    onMounted(() => {
      audio = props.audioElement || new Audio()
      audio.volume = states.volume / 100
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
      setVolume,
      setAudioCurrentTime,
      ...toRefs(states)
    }
  }
}
</script>

<style>

</style>
