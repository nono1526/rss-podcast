<template>
  <PCover
    :image-url="imageUrl"
  >
    <div class="flex flex-col h-full">
      <div class="text-2xl font-medium">
        {{ title }}
      </div>
      <div class="mt-auto">
        <div class="text-sm mt-5">
          {{ channelName }} - {{ author }}
        </div>

        <button
          class="border px-5 py-3"
          @click="play(audio)"
        >
          Play
        </button>
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
import { onMounted, reactive, toRefs, computed, inject } from 'vue'
import { useRoute } from 'vue-router'
import { fetchEpisodeById } from '@src/api/request.js'
import PCover from '@src/components/PCover.vue'

export default {
  components: {
    PCover
  },
  setup () {
    const route = useRoute()
    const states = reactive({
      title: '',
      description: '',
      channelName: '',
      imageUrl: '',
      createAt: 'null',
      duration: 0,
      author: '',
      audio: {}
    })

    const audioControl = inject('audio')

    const init = async () => {
      const { id } = route.params
      const episode = await fetchEpisodeById(id)
      states.title = episode.title
      states.description = episode.description
      states.channelName = episode.channelName
      states.imageUrl = episode.imageUrl
      states.createAt = episode.pubDate
      states.duration = episode['itunes:duration']
      states.author = episode['itunes:author']
      states.audio = episode.audio
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

    const play = audio => {
      audioControl.url = `${audio.url}?timestamp=${Date.now()}`
      console.log(states.imageUrl)
      audioControl.cover = states.imageUrl
      audioControl.title = states.title
      audioControl.subTitle = states.channelName
    }
    onMounted(() => {
      init()
    })

    return {
      ...toRefs(states),
      createDate,
      showMinutesDuration,
      play
    }
  }
}
</script>

<style>

</style>
