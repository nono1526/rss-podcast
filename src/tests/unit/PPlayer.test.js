import PPLayer from '@src/components/PPLayer.vue'
import { shallowMount } from '@vue/test-utils'

describe('PPLayer.vue', () => {
  let mountFunction
  const fakeAudio = new Audio()

  beforeEach(() => {
    mountFunction = options => shallowMount(PPLayer, {
      ...options,
      propsData: {
        audioElement: fakeAudio
      }
    })
  })
  it('match snapshot', () => {
    const wrapper = mountFunction({})
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should play when props.url change', async () => {
    const play = jest.fn()
    fakeAudio.play = play
    const wrapper = mountFunction({})
    await wrapper.setProps({ url: 'a. mp4' })
    expect(play).toBeCalled()
  })

  it('should trigger @end when audio ended', () => {
    const wrapper = mountFunction({})
    fakeAudio.dispatchEvent(new Event('ended'))
    expect(wrapper.emitted('ended')).toHaveLength(1)
  })

  it('should click nextBtn work', () => {
    const wrapper = mountFunction({})
    const nextBtn = wrapper.findComponent('[data-test="next-btn"]')
    nextBtn.vm.$emit('click')
    expect(wrapper.emitted('click:next')).toHaveLength(1)
  })

  it('should click prev work', () => {
    const wrapper = mountFunction({})
    const prevBtn = wrapper.findComponent('[data-test="prev-btn"]')
    prevBtn.vm.$emit('click')
    expect(wrapper.emitted('click:prev')).toHaveLength(1)
  })

  it('click play btn toggle isPlaying ', async () => {
    const wrapper = mountFunction({})
    const playBtn = wrapper.findComponent('[data-test="play-btn"]')
    playBtn.vm.$emit('click')
    expect(wrapper.emitted('update:isPlaying').pop()).toEqual([true])
    await wrapper.setProps({
      isPlaying: true
    })
    playBtn.vm.$emit('click')
    expect(wrapper.emitted('update:isPlaying').pop()).toEqual([false])
  })

  it('should isPlaying state control play() and pause()', async () => {
    const play = jest.fn()
    const pause = jest.fn()
    fakeAudio.play = play
    fakeAudio.pause = pause
    const wrapper = mountFunction({})
    await wrapper.setProps({
      isPlaying: true
    })
    expect(play).toBeCalled()
    await wrapper.setProps({
      isPlaying: false
    })
    expect(pause).toBeCalled()
  })

  it('should sync currentTime', async () => {
    const wrapper = mountFunction({})
    fakeAudio.dispatchEvent(new Event('timeupdate'))
    expect(wrapper.emitted('update:currentTime')).toHaveLength(1)
  })

  it('playedTime correctly', async () => {
    const wrapper = mountFunction({})
    expect(wrapper.vm.playedTime).toBe('00:00')
    await wrapper.setProps({ currentTime: 10 })
    expect(wrapper.vm.playedTime).toBe('00:10')
    await wrapper.setProps({ currentTime: 70 })
    expect(wrapper.vm.playedTime).toBe('01:10')
    await wrapper.setProps({ currentTime: 60 * 60 })
    expect(wrapper.vm.playedTime).toBe('01:00:00')
  })

  it('restTime correctly', async () => {
    const wrapper = mountFunction({})
    wrapper.vm.duration = 10
    expect(wrapper.vm.restTime).toBe('00:10')
    wrapper.vm.duration = 60 * 60
    expect(wrapper.vm.restTime).toBe('01:00:00')
    await wrapper.setProps({ currentTime: 60 })
    expect(wrapper.vm.restTime).toBe('59:00')
    await wrapper.setProps({ currentTime: 61 })
    expect(wrapper.vm.restTime).toBe('58:59')
  })

  it('set volume', async () => {
    const wrapper = mountFunction({})
    const volumeSlider = wrapper.findComponent('[data-test="volume-slider"]')
    volumeSlider.vm.$emit('input', 100)
    expect(fakeAudio.volume).toBe(1)
    volumeSlider.vm.$emit('input', 0)
    expect(fakeAudio.volume).toBe(0)
    volumeSlider.vm.$emit('input', 50)
    expect(fakeAudio.volume).toBe(0.5)
  })
})
