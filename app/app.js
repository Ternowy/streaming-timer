import { createApp } from 'vue'
import App from 'app/components/App.vue'
import HtmlPlayerPlugin from './services/HtmlPlayerPlugin.js'

export default async (videoQuerySelector = 'video') => {
  const driver = await HtmlPlayerPlugin.getPlayer(videoQuerySelector)
  const containerId = 'streaming-timer-app'
  const app = createApp(App, {driver})
  document.body.insertAdjacentHTML('afterend', `<div id="${containerId}"></div>`)
  app.mount(`#${containerId}`)
}