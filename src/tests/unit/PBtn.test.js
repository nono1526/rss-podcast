import { shallowMount } from '@vue/test-utils'
import PBtn from '@src/components/PBtn.vue'

describe('PBtn.vue', () => {
  let mountFunction
  beforeEach(() => {
    mountFunction = config => shallowMount(PBtn, {
      ...config
    })
  })

  it('default slot render', () => {
    const slotText = 'default'
    const wrapper = mountFunction({
      slots: {
        default: slotText
      }
    })
    expect(wrapper.html()).toContain(slotText)
  })

  it('props: disabled set class', async () => {
    const wrapper = mountFunction({
      propsData: {
        disabled: true
      }
    })
    const button = wrapper.find('button')
    expect(button.classes()).toContain('p-btn--disabled')
  })

  it('props: fab set class', async () => {
    const wrapper = mountFunction({
      propsData: {
        fab: true
      }
    })
    const button = wrapper.find('button')
    expect(button.classes()).toContain('p-btn--fab')
  })

  it('props: icon set class', async () => {
    const wrapper = mountFunction({
      propsData: {
        icon: true
      }
    })
    const button = wrapper.find('button')
    expect(button.classes()).toContain('p-btn--icon')
  })

  it('props: button set disabled', async () => {
    const wrapper = mountFunction({
      propsData: {
        disabled: true
      }
    })
    const button = wrapper.find('button')
    expect(button.element.disabled).toBe(true)
    await wrapper.setProps({ disabled: false })
    expect(button.element.disabled).toBe(false)
  })
})
