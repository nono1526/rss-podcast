<template>
  <div
    :style="{
      height,
      width
    }"
  >
    <svg
      v-if="showPause"
      xmlns="http://www.w3.org/2000/svg"
      :height="height"
      :width="width"
      viewBox="0 0 24 24"
      :fill="color"
    ><path
      d="M0 0h24v24H0V0z"
      fill="none"
    /><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>
    <svg
      v-else
      xmlns="http://www.w3.org/2000/svg"
      :height="height"
      :width="width"
      viewBox="0 0 24 24"
      :fill="color"
    ><path
      d="M0 0h24v24H0V0z"
      fill="none"
    /><path d="M10 8.64L15.27 12 10 15.36V8.64M8 5v14l11-7L8 5z" /></svg>
  </div>
</template>

<script>
export default {
  props: {
    showPause: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: '#000'
    },
    width: {
      type: String,
      default: '24px'
    },
    height: {
      type: String,
      default: '24px'
    }
  }
}
</script>

<style>

</style>
