import { createRouter, createWebHistory } from 'vue-router'

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
  history: createWebHistory(),
  routes
})

export default router
