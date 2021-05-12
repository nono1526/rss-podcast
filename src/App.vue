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
      fixed
    />
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
      currentTime: 0,
      visible: false,
      nowPlayingId: '',
      audioElement: new Audio(),
      playList: []
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
