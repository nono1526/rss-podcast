import PCover from '@src/components/PCover.vue'
import { shallowMount } from '@vue/test-utils'
describe('PCover.vue', () => {
  let mountFunction
  beforeEach(() => {
    mountFunction = (options = {}) => shallowMount(PCover, {
      ...options
    })
  })
  it('renders props.title when passed', () => {
    const title = '股癌'

    const wrapper = mountFunction({
      propsData: {
        title
      }
    })
    expect(wrapper.html()).toContain(title)
  })

  it('renders props.description when passed', () => {
    const description = 'description'

    const wrapper = mountFunction({
      propsData: {
        description
      }
    })
    expect(wrapper.html()).toContain(description)
  })
})
