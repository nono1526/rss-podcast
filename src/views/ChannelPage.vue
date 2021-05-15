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
        <div class="flex-1 ml-5 flex flex-col justify-center">
          <h5 class="">
            {{ item.title }}
          </h5>
          <div class="text-sm text-gray-400">
            {{ author }}
          </div>
        </div>
      </template>
      <template #body>
        {{ item.description }}
      </template>
      <template #footer>
        <span>{{ toYYYYMMDDByDate(item.pubDate) }} · {{ getMinutesFromSecs(item['itunes:duration']) }}</span>
      </template>
    </PItem>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { fetchChannel } from '@src/api/request.js'
import PCover from '@src/components/PCover.vue'
import PItem from '@src/components/PItem.vue'
export default {
  components: {
    PCover,
    PItem
  },
  setup () {
    const router = useRouter()

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

    const toEpisodePage = episode => {
      router.push(`/episode/${encodeURIComponent(episode.guid['#text'])}`)
    }
    const toYYYYMMDDByDate = d => {
      const date = new Date(d)
      return date.toISOString().slice(0, 10)
    }
    const getMinutesFromSecs = secs => {
      const minutes = Math.floor(secs / 60)
      return `${minutes} 分鐘`
    }

    onMounted(() => {
      init()
    })

    return {
      ...toRefs(states),
      toEpisodePage,
      toYYYYMMDDByDate,
      getMinutesFromSecs

    }
  }
}
</script>

<style>

</style>
