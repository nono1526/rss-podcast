import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default (command, mode) => {
  return {
    plugins: [vue()],
    base: './',
    resolve: {
      alias: {
        '@src': path.resolve(__dirname, '/src')
      }
    }
  }
}
