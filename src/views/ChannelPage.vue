<template>
  <PCover
    :title="title"
    :description="description"
    :image-url="image.url"
    :image-alt="image.title"
    :author="author"
  >
    <div>{{ author }}</div>
    <div class="text-2xl font-medium">
      {{ title }}
    </div>
    <p class="whitespace-pre-wrap mt-3">
      {{ description }}
    </p>
  </PCover>
  <div class="container mx-auto px-5">
    <h2 class="font-bold text-2xl mt-8">
      所有集數
    </h2>
    <PItem
      v-for="(item, i) in items"
      :key="i"
      :image-url="image.url"
      @click="toEpisodePage(item)"
    >
      <template #head>
        <div class="flex ml-5 flex-col justify-center">
          <h5 class="">
            {{ item.title }}
          </h5>
          <div class="text-sm text-gray-400">
            {{ author }}
          </div>
        </div>
        <div class="w-40 ml-auto text-right">
          <PBtn
            fab
            class="mx-auto"
            @click.stop="playEpisode(item)"
          >
            <PlayIcon
              width="32px"
              height="32px"
              :show-pause="canPlay(item.guid['#text'])"
            />
          </PBtn>
        </div>
      </template>
      <template #body>
        {{ item.description }}
      </template>
      <template #footer>
        <span class="flex items-center">
          {{ toYYYYMMDD(item.pubDate) }} · {{ getMinutesFromSecs(item['itunes:duration']) }} 分鐘
          <div class="w-40 ml-auto">
            <PSlider
              v-show="isNowPlayingId(item.guid['#text'])"
              :value="(currentTime / item['itunes:duration'] * 100)"
              disabled
            />
          </div>
        </span>
      </template>
    </PItem>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs, toRef } from 'vue'
import { useRouter } from 'vue-router'
import {
  fetchChannel,
  findPreviousEpisodeIdById,
  findNextEpisodeIdById
} from '@src/api/request.js'
import { usePPlayer } from '@src/compostable/audio.js'
import {
  toYYYYMMDD,
  getMinutesFromSecs
} from '@src/utils/formatters.js'

import PSlider from '@src/components/PSlider.vue'
import PlayIcon from '@src/components/PlayIcon.vue'
import PBtn from '@src/components/PBtn.vue'
import PCover from '@src/components/PCover.vue'
import PItem from '@src/components/PItem.vue'

export default {
  components: {
    PCover,
    PItem,
    PSlider,
    PBtn,
    PlayIcon
  },
  setup () {
    const router = useRouter()
    const {
      audioControl,
      play,
      setPlayer,
      isNowPlayingId,
      canPlay
    } = usePPlayer()

    const isPlayingEpisodeById = id => {
      return audioControl.nowPlayingId === id
    }

    const states = reactive({
      title: '',
      author: '',
      image: {},
      items: [],
      description: ''
    })
    // This starter template is using Vue 3 experimental <script setup> SFCs
    // Check out https://github.com/vuejs/rfcs/blob/script-setup-2/active-rfcs/0000-script-setup.md
    const init = async () => {
      const {
        title,
        image,
        item,
        description,
        author
      } = await fetchChannel()
      states.title = title
      states.image = image
      states.items = item
      states.author = author
      states.description = description
    }

    const playEpisode = item => {
      const {
        title,
        guid: {
          '#text': id
        },
        enclosure: {
          '@_url': url
        }
      } = item

      if (isNowPlayingId(id)) {
        audioControl.isPlaying = !audioControl.isPlaying
      } else {
        play(url)
        setPlayer({
          cover: states.image.url,
          title,
          subTitle: states.author,
          nowPlayingId: id,
          nextEpisode: findNextEpisodeIdById(id),
          prevEpisode: findPreviousEpisodeIdById(id)
        })
      }
    }

    const toEpisodePage = episode => {
      router.push(`/episode/${encodeURIComponent(episode.guid['#text'])}`)
    }

    onMounted(() => {
      init()
    })

    return {
      ...toRefs(states),
      toEpisodePage,
      toYYYYMMDD,
      getMinutesFromSecs,
      isPlayingEpisodeById,
      playEpisode,
      canPlay,
      isNowPlayingId,
      currentTime: toRef(audioControl, 'currentTime')
    }
  }
}
</script>

<style>

</style>
