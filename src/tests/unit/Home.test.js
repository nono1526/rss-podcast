import { shallowMount } from '@vue/test-utils'
import flushPromises from 'flush-promises'
import Home from '@src/views/Home.vue'
jest.mock('@src/api/request.js', () => ({
  __esModule: true, // this property makes it work
  fetchChannel () {
    return {
      title: '股癌',
      description: 'abcdefg'
    }
  }
}))

describe('test', () => {
  it('should work', async () => {
    const wrapper = shallowMount(Home)
    await flushPromises()
    expect(wrapper.html()).toContain('股癌')
  })
})
