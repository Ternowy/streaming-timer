import App from './app.js'

class Netflix extends App {
  constructor () {
    super()
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
    const middle = (this.player.duration / 2)
    const currentTime = this.player.currentTime
    return ((currentTime + 5) > middle) && ((currentTime - 5) < middle)
  }
}

new Netflix()