<template>
  <div>{{ title }}</div>
  <div>{{ description }}</div>
</template>

<script setup>
import { onMounted, reactive, toRefs } from 'vue'
// import parser from 'fast-xml-parser'
import { fetchChannel } from '@/api/request.js'

const states = reactive({
  title: '1',
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

const {
  title,
  image,
  item,
  description
} = toRefs(states)
</script>

<style>

</style>
