<template>
  <div
    class="p-slider"
    draggable
    @mousedown="mousedown"
  >
    <div
      class="p-slider__track-container"
    >
      <div
        class="p-slider__track-fill"
        :style="{
          width: `${precent}%`
        }"
      >
        <div
          v-if="!disabled"
          class="p-slider__thumb group-hover:block"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, onUnmounted, ref } from 'vue'
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
    const isMousedown = ref(false)
    let startX = 0
    let startOffsetX = 0
    let barWidth = 0
    const mousedown = e => {
      e.preventDefault()
      if (props.disabled) return false
      const { width } = e.currentTarget.getBoundingClientRect()
      barWidth = width
      isMousedown.value = true
      startX = e.clientX
      startOffsetX = e.clientX - e.currentTarget.offsetLeft
      internalValue.value = getValueByBarInteraction(startOffsetX, barWidth)
      emit('dragstart', e)
    }

    const moving = e => {
      if (!isMousedown.value) return false
      const dx = e.clientX - startX
      const offsetX = startOffsetX + dx
      internalValue.value = getValueByBarInteraction(offsetX, barWidth)
      emit('dragging', e)
    }

    const mouseup = e => {
      if (!isMousedown.value) return false
      isMousedown.value = false
      emit('dragend', e)
    }
    const precent = computed(() => {
      return ((props.value - props.min) / (props.max - props.min)) * 100
    })

    const internalValue = computed({
      get () {
        return valueRangeValidator(props.value)
      },
      set (val) {
        return emit('input', valueRangeValidator(val))
      }
    })

    const getValueByBarInteraction = (offsetX, barWidth) => {
      return Math.round((offsetX / barWidth) * props.max)
    }

    const valueRangeValidator = value => {
      value = Math.max(props.min, value)
      value = Math.min(props.max, value)
      return value
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
      mousedown,
      internalValue
    }
  }

}
</script>

<style>
.p-slider {
  @apply h-5 w-full flex items-center cursor-pointer group
}

.p-slider .p-slider__track-container {
  @apply rounded shadow bg-white relative h-1 flex-1
}

.p-slider .p-slider__thumb {
  @apply hidden h-3 w-3 rounded-full bg-blue-500 absolute shadow-2xl transform -translate-y-2/4 top-2/4 translate-x-2/4 right-0 cursor-pointer
}

.p-slider .p-slider__track-fill {
  @apply h-full bg-blue-400 rounded relative
}
</style>
