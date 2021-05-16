import PSlider from '@src/components/PSlider.vue'
import { shallowMount } from '@vue/test-utils'
describe('PSlider.vue', () => {
  let mountFunction
  beforeEach(() => {
    mountFunction = options => shallowMount(PSlider, {
      ...options
    })
  })

  it('should match snapshot', async () => {
    const wrapper = mountFunction({})

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('has correct track fill percent width with props.min/max/value', async () => {
    const wrapper = mountFunction({
      propsData: {
        min: 50,
        max: 100,
        value: 60
      }
    })
    const fill = wrapper.find('.p-slider__track-fill')
    expect(fill.element.style.width).toBe('20%')
    await wrapper.setProps({
      value: 50
    })
    expect(fill.element.style.width).toBe('0%')
    await wrapper.setProps({
      value: 100
    })
    expect(fill.element.style.width).toBe('100%')
    await wrapper.setProps({
      value: 100,
      min: 0,
      max: 100
    })
    expect(fill.element.style.width).toBe('100%')
    await wrapper.setProps({
      value: 50
    })
    expect(fill.element.style.width).toBe('50%')
  })

  it('mouse event flow', () => {
    const wrapper = mountFunction({})

    const input = wrapper.find('.p-slider')

    input.trigger('mousedown')

    expect(wrapper.emitted('dragstart')).toHaveLength(1)
    expect(wrapper.emitted('input')).toHaveLength(1)

    document.dispatchEvent(new Event('mousemove'))
    expect(wrapper.emitted('input')).toHaveLength(2)

    document.dispatchEvent(new Event('mouseup'))
    expect(wrapper.emitted('dragend')).toHaveLength(1)

    document.dispatchEvent(new Event('mousemove'))
    expect(wrapper.emitted('input')).toHaveLength(2) // not 3 because mouse is up
  })

  it('should not react to mousedown when disabled', () => {
    const wrapper = mountFunction({
      propsData: {
        disabled: true
      }
    })
    const input = wrapper.find('.p-slider')

    input.trigger('mousedown')
    expect(wrapper.emitted('dragstart')).toBeFalsy()
  })

  it('internalValue get correctly value by min/max', async () => {
    const wrapper = mountFunction({
      propsData: {
        min: 2,
        max: 5,
        value: 10
      }
    })
    expect(wrapper.vm.internalValue).toBe(5)
    await wrapper.setProps({
      value: 0
    })
    expect(wrapper.vm.internalValue).toBe(2)
  })

  it('internalValue set correctly value by min/max', async () => {
    const wrapper = mountFunction({
      propsData: {
        min: 2,
        max: 5,
        value: 10
      }
    })
    wrapper.vm.internalValue = 0
    expect(wrapper.emitted('input')).toEqual([[2]])
    wrapper.vm.internalValue = 10
    expect(wrapper.emitted('input')).toEqual([[2], [5]])
  })
})
