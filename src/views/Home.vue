<template>
  <div class="">
    {{ title }}
  </div>
  <div>{{ description }}</div>
</template>

<script>
import { onMounted, reactive, toRefs } from 'vue'
import { fetchChannel } from '@src/api/request.js'
export default {
  setup () {
    const states = reactive({
      title: '',
      image: {},
      item: [],
      description: ''
    })
    // This starter template is using Vue 3 experimental <script setup> SFCs
    // Check out https://github.com/vuejs/rfcs/blob/script-setup-2/active-rfcs/0000-script-setup.md
    const init = async () => {
      const {
        title,
        image,
        item,
        description
      } = await fetchChannel()
      states.title = title
      states.image = image
      states.item = item
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
