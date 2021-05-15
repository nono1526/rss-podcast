<template>
  <div
    class="h-5 w-full flex items-center cursor-pointer group"
    draggable
    @mousedown="mousedown"
  >
    <div
      class="rounded shadow bg-white relative h-1 flex-1"
    >
      <div
        class="h-full bg-blue-400 rounded relative"
        :style="{
          width: `${precent}%`
        }"
      >
        <div
          v-if="!disabled"
          class="hidden group-hover:block h-3 w-3 rounded-full bg-blue-500 absolute shadow-2xl transform -translate-y-2/4 top-2/4 translate-x-2/4 right-0 cursor-pointer hover-target"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, onUnmounted } from 'vue'
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
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ['input', 'dragstart', 'dragging', 'dragend'],
  setup (props, { emit }) {
    let isMousedown = false
    let startX = 0
    let startOffsetX = 0
    let barWidth = 0
    const mousedown = e => {
      e.preventDefault()
      if (props.disabled) return false
      const { width } = e.currentTarget.getBoundingClientRect()
      barWidth = width
      isMousedown = true
      startX = e.clientX
      startOffsetX = e.clientX - e.currentTarget.offsetLeft
      const newValue = valueRangeValidator(getValueByBarInteraction(startOffsetX, barWidth))
      emit('input', newValue)
      emit('dragstart', e)
    }
    const mouseup = e => {
      if (!isMousedown) return false
      isMousedown = false
      emit('dragend', e)
    }
    const precent = computed(() => {
      return (props.value / (props.max - props.min)) * 100
    })

    const getValueByBarInteraction = (offsetX, barWidth) => {
      return Math.round((offsetX / barWidth) * props.max)
    }

    const valueRangeValidator = value => {
      value = Math.max(props.min, value)
      value = Math.min(props.max, value)
      return value
    }

    const moving = e => {
      if (!isMousedown) return false
      const dx = e.clientX - startX
      const offsetX = startOffsetX + dx
      const newValue = valueRangeValidator(getValueByBarInteraction(offsetX, barWidth))

      emit('input', newValue)
      emit('dragging', e)
    }

    const bindEvents = () => {
      document.addEventListener('mousemove', moving)
      document.addEventListener('mouseup', mouseup)
    }

    const unBindEvents = () => {
      document.removeEventListener('mousemove', moving)
      document.removeEventListener('mouseup', mouseup)
    }

    onMounted(() => {
      bindEvents()
    })

    onUnmounted(() => {
      unBindEvents()
    })
    return {
      precent,
      mousedown
    }
  }

}
</script>

<style>

</style>
