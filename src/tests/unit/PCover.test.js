import PCover from '@src/components/PCover.vue'
import { shallowMount } from '@vue/test-utils'
describe('PCover.vue', () => {
  let mountFunction
  beforeEach(() => {
    mountFunction = (options = {}) => shallowMount(PCover, {
      ...options
    })
  })
  it('renders props.imgUrl when passed', () => {
    const imageUrl = 'https://test.jpg'
    const imageAlt = 'image alt'
    const wrapper = mountFunction({
      propsData: {
        imageUrl,
        imageAlt
      }
    })
    const img = wrapper.find('img')
    expect(img.attributes('src')).toBe(imageUrl)
    expect(img.attributes('alt')).toBe(imageAlt)
  })

  it('snapshot testing', () => {
    const imageUrl = 'https://test.jpg'
    const imageAlt = 'image alt'
    const wrapper = mountFunction({
      propsData: {
        imageUrl,
        imageAlt
      },
      slots: {
        default: '<div>Default slot</div>'
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })
})
