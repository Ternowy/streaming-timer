export default class HtmlPlayerPlugin {
  constructor (player) {
    this.player = player
    this.watched = 0
    this.startTicking()
  }

  startTicking () {
    setInterval(() => {
      if (this.isPlaying()) {
        this.watched++
        this.whenPlaying(this.watched)
      }
    }, 1000)
  }

  whenPlaying(watched) {}

  static getPlayer (selector) {
    return new Promise(resolve => {
      const observer = new MutationObserver(mutations => mutations.forEach(
        ({addedNodes}) => addedNodes.forEach(node => {
          const player = node.querySelector(selector)
          if (player) {
            observer.disconnect()
            resolve(new this(player))
          }
        })
      ))

      observer.observe(document.body, { childList: true, subtree: true })
    })
  }

  isPlaying () {
    return !this.player.paused
  }
  stop () {
    this.player.pause()
  }
  play () {
    this.player.play()
  }
  isInTheMiddle () {
    return true
    const middle = (this.player.duration / 2)
    const currentTime = this.player.currentTime
    return ((currentTime + 5) > middle) && ((currentTime - 5) < middle)
  }
}