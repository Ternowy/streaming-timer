window.VideoBridge = class {
  constructor (player) {
    this.player = player
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