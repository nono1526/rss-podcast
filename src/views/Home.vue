<template>
  <PCover
    :title="title"
    :description="description"
    :image-url="image.url"
    :image-alt="image.title"
    :author="author"
  />
  <div class="container mx-auto px-5">
    <h2 class="text-w">
      所有集數
    </h2>
    <PList
      v-for="(item, i) in items"
      :key="i"
    >
      {{ item }}
    </PList>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs } from 'vue'
import { fetchChannel } from '@src/api/request.js'
import PCover from '@src/components/PCover.vue'
export default {
  components: {
    PCover
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
