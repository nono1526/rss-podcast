import PItem from '@src/components/PItem.vue'
import { shallowMount } from '@vue/test-utils'
describe('PItem.vue', () => {
  it('slots snapshot testing', () => {
    const wrapper = shallowMount(PItem, {
      slots: {
        head: '<div>head</div>',
        body: '<div>body</div>',
        footer: '<div>footer</div>'
      }
    })

    expect(wrapper.element).toMatchSnapshot()
  })
})
