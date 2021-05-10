<template>
  <PCover
    :title="title"
    :description="description"
    :image-url="image.url"
    :image-alt="image.title"
    :author="author"
  />
  <div class="container mx-auto px-5">
    <h2 class="font-bold text-2xl mt-8">
      所有集數
    </h2>
    <PItem
      v-for="(item, i) in items"
      :key="i"
      :image-url="image.url"
      :title="item.title"
      :author="title"
      :description="item.description"
      :create-at="item['pubDate']"
      :duration="item['itunes:duration']"
      :audio-url="item.link"
    >
      {{ item }}
    </PItem>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs } from 'vue'
import { fetchChannel } from '@src/api/request.js'
import PCover from '@src/components/PCover.vue'
import PItem from '@src/components/PItem.vue'
export default {
  components: {
    PCover,
    PItem
  },
  setup () {
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
    onMounted(() => {
      init()
    })

    return {
      ...toRefs(states)
    }
  }
}
</script>

<style>

</style>
