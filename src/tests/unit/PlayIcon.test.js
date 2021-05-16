import PlayIcon from '@src/components/PlayIcon.vue'
import { shallowMount } from '@vue/test-utils'
describe('PlayIcon.vue', () => {
  let mountFunction
  beforeEach(() => {
    mountFunction = options => shallowMount(PlayIcon, {
      ...options
    })
  })
  it('show correctly icon by props.showPause', async () => {
    const wrapper = mountFunction({
      props: {
        showPause: false
      }
    })
    const pausePath = 'M6 19h4V5H6v14zm8-14v14h4V5h-4z'
    const playPath = 'M10 8.64L15.27 12 10 15.36V8.64M8 5v14l11-7L8 5z'
    expect(wrapper.html()).toContain(playPath)

    await wrapper.setProps({
      showPause: true
    })
    expect(wrapper.html()).toContain(pausePath)
  })

  it('props.color change svg color', () => {
    const color = 'red'
    const wrapper = mountFunction({
      propsData: {
        showPause: false,
        color
      }
    })
    const svg = wrapper.find('svg')
    expect(svg.attributes('fill')).toBe(color)
  })

  it('props.width/height change svg size', () => {
    const width = '32px'
    const height = '32px'
    const wrapper = mountFunction({
      propsData: {
        width,
        height
      }
    })
    const svg = wrapper.find('svg')
    expect(svg.attributes('width')).toBe(width)
    expect(svg.attributes('height')).toBe(height)
  })
})
