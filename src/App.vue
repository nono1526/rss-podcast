<template>
  <div class="w-screen h-screen bg-gray-50 mb-52">
    <router-view />
    <PPlayer
      v-model:isPlay="isPlay"
      v-model:url="url"
      v-model:currentTime="currentTime"
      :cover="cover"
      :title="title"
      :sub-title="subTitle"
    />
    {{ currentTime }}
  </div>
</template>

<script>
import { toRefs, reactive, provide } from 'vue'
import PPlayer from '@src/components/PPlayer.vue'
export default {
  components: {
    PPlayer
  },
  setup () {
    const audio = reactive({
      isPlay: false,
      url: '',
      cover: '',
      title: '',
      subTitle: '',
      currentTime: 0
    })

    provide('audio', audio)
    return {
      ...toRefs(audio)
    }
  }
}
</script>

<style>

</style>
