import { createRouter, createWebHashHistory } from 'vue-router'

import ChannelPage from '@src/views/ChannelPage.vue'
import EpisodePage from '@src/views/EpisodePage.vue'

const routes = [
  {
    path: '/',
    name: 'channel',
    component: ChannelPage
  },
  {
    path: '/episode/:id',
    name: 'episode',
    component: EpisodePage
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior (to, from, savedPosition) {
    if (to.name === 'channel') {
      return savedPosition
    }
    return {
      left: 0,
      top: 0
    }
  },
  routes
})

export default router
