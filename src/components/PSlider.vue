<template>
  <div
    class="h-1 flex-1 rounded shadow cursor-pointer bg-white relative"
    v-bind="$attrs"
  >
    <div
      class="h-full bg-blue-400 rounded"
      :style="{
        width: `${precent}%`
      }"
    />
    <div
      class="h-3 w-3 rounded-full bg-blue-500 absolute shadow-2xl transform -translate-y-2/4 top-2/4 -translate-x-2/4 cursor-pointer"
      :style="{
        left: `${precent}%`
      }"
    />
  </div>
</template>

<script>
import { computed } from 'vue'
export default {

  name: 'PSlider',
  inheritAttrs: false,
  props: {
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    value: {
      type: Number,
      default: 50
    }
  },
  emits: ['input'],
  setup (props) {
    const precent = computed(() => {
      return (props.value / (props.max - props.min)) * 100
    })
    return {
      precent
    }
  }

}
</script>

<style>

</style>
