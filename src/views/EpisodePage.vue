<template>
  <PCover
    :image-url="imageUrl"
  >
    <div class="flex flex-col h-full">
      <div class="text-6xl font-medium">
        {{ title }}
      </div>
      <div class="mt-auto">
        <PBtn fab>
          <PlayIcon
            width="2rem"
            height="2rem"
            :show-pause="canPlay(id)"
            @click="onClickPlay(audio.url)"
          />
        </PBtn>
        <div class="text-sm mt-3">
          {{ channelName }} - {{ author }}
        </div>
        <div>
          {{ createDate }} · {{ showMinutesDuration }}
        </div>
      </div>
    </div>
  </PCover>
  <div class="container mx-auto px-5">
    <h2 class="font-bold text-2xl mt-8">
      本集介紹
    </h2>
    <p class="whitespace-pre-wrap ">
      {{ description }}
    </p>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { fetchEpisodeById } from '@src/api/request.js'
import PCover from '@src/components/PCover.vue'
import PlayIcon from '@src/components/PlayIcon.vue'
import PBtn from '@src/components/PBtn.vue'
import { usePPlayer } from '@src/compostable/audio.js'

export default {
  components: {
    PCover,
    PlayIcon,
    PBtn
  },
  setup () {
    const route = useRoute()
    const {
      audioControl,
      play,
      setPlayer,
      isNowPlayingId,
      canPlay
    } = usePPlayer()
    const states = reactive({
      title: '',
      description: '',
      channelName: '',
      imageUrl: '',
      createAt: 'null',
      duration: 0,
      author: '',
      audio: {},
      id: '',
      nextEpisode: '',
      prevEpisode: ''
    })

    const init = async () => {
      const { id } = route.params
      const episode = await fetchEpisodeById(id)
      states.id = episode.id
      states.title = episode.title
      states.description = episode.description
      states.channelName = episode.channelName
      states.imageUrl = episode.imageUrl
      states.createAt = episode.pubDate
      states.duration = episode['itunes:duration']
      states.author = episode['itunes:author']
      states.audio = episode.audio
      states.nextEpisode = episode.nextEpisode
      states.prevEpisode = episode.prevEpisode
    }

    // @todo create composition api
    const createDate = computed(() => {
      const date = new Date(states.createAt)
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    })
    const showMinutesDuration = computed(() => {
      const minutes = Math.floor(states.duration / 60)
      return `${minutes} 分鐘`
    })

    const onClickPlay = url => {
      if (isNowPlayingId(states.id)) {
        audioControl.isPlaying = !audioControl.isPlaying
      } else {
        play(url)
        setPlayer({
          cover: states.imageUrl,
          title: states.title,
          subTitle: states.channelName,
          nowPlayingId: states.id,
          nextEpisode: states.nextEpisode,
          prevEpisode: states.prevEpisode
        })
      }
    }

    watch(() => route.params, () => {
      init()
    })

    onMounted(() => {
      init()
    })

    return {
      ...toRefs(states),
      createDate,
      showMinutesDuration,
      play,
      canPlay,
      onClickPlay
    }
  }
}
</script>

<style>

</style>
