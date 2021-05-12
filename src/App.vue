<template>
  <div class="bg-gray-50 pb-40 min-h-screen">
    <router-view />
    <PPlayer
      v-model:isPlay="isPlay"
      v-model:url="url"
      v-model:currentTime="currentTime"
      v-model:visible="visible"
      :audio-element="audioElement"
      :cover="cover"
      :title="title"
      :sub-title="subTitle"
      :has-next="hasNext"
      :has-prev="hasPrev"
      fixed
      @click:info="toEpisodePage"
      @click:prev="toEpisodeById(prevEpisode)"
      @click:next="toEpisodeById(nextEpisode)"
    />
  </div>
</template>

<script>
import { toRefs, reactive, provide, computed } from 'vue'
import { fetchEpisodeById } from '@src/api/request.js'
import { useRouter } from 'vue-router'

import PPlayer from '@src/components/PPlayer.vue'
export default {
  components: {
    PPlayer
  },
  setup () {
    const router = useRouter()

    const audio = reactive({
      isPlay: false,
      url: '',
      cover: '',
      title: '',
      subTitle: '',
      currentTime: 0,
      visible: false,
      nowPlayingId: '',
      audioElement: new Audio(),
      nextEpisode: '',
      prevEpisode: ''
    })

    provide('audio', audio)
    const hasPrev = computed(() => {
      return audio.prevEpisode !== null
    })
    const hasNext = computed(() => {
      return audio.nextEpisode !== null
    })
    const toEpisodePage = () => {
      router.push(`/episode/${audio.nowPlayingId}`)
    }
    const toEpisodeById = async id => {
      const episode = await fetchEpisodeById(id)
      audio.nowPlayingId = episode.id
      audio.title = episode.title
      audio.description = episode.description
      audio.channelName = episode.channelName
      audio.imageUrl = episode.imageUrl
      audio.createAt = episode.pubDate
      audio.duration = episode['itunes:duration']
      audio.author = episode['itunes:author']
      audio.audio = episode.audio
      audio.nextEpisode = episode.nextEpisode
      audio.prevEpisode = episode.prevEpisode
      audio.url = episode.audio.url
    }

    return {
      ...toRefs(audio),
      toEpisodeById,
      hasPrev,
      hasNext,
      toEpisodePage
    }
  }
}
</script>

<style>

</style>
