export default class App {
  constructor () {
    this.watched = 0
    this.hadBeenStoped = false

    document.body.insertAdjacentHTML(
      'afterend',
      `<dialog id="stop-netflix-overlay">This is a dialog.<br><button>Close</button></dialog>`
    )

    this.initializeNodeObserver()
  }

  initializeNodeObserver () {
    const observer = new MutationObserver(mutations => mutations.forEach(
      ({addedNodes}) => addedNodes.forEach(node => {
        if (node.querySelector('video')) {
          this.mountApp(node.querySelector('video'))
          observer.disconnect()
        }
      })
    ))

    observer.observe(document.body, { childList: true, subtree: true })
  }

  mountApp (video) {
    this.player = video

    setInterval(() => {
      if (this.isPlaying()) {
        this.watched++
        console.log('watched triggered')
        if (this.isInTheMiddle() && this.watched > 1 && !this.hadBeenStoped) {
          this.showModal()
          this.stop()
          this.hadBeenStoped = true
        }
      }
      //clearInterval(repeater)
    }, 1000)
  }

  showModal () {
    const dialog = document.querySelector('#stop-netflix-overlay')

    dialog.querySelector('button').addEventListener('click', () => {
      dialog.close()
      this.play()
    })

    dialog.showModal()
  }

  isPlaying () {}
  isInTheMiddle () {}
  stop () {}
  play () {}
}

/**
 * Start tick each second
 *  If video is playing record time (watched++)
 *    // Check if Video is
 *     // in the middle (currentTime === duration/2)
 *     // if watched > 60 (more than 1 minute)
 *     // if anti-plot-mode is on
 *     // Pause video
 *     // Show modal
 *     // Stop timer

 *
 *
 * Restart timer after any change in the url
 */

/**
 * Modal has 4 buttons, designed like netflix
 * [Ok, it's enough]
 *   Closes modal window
 * [Remind in 1 minute]
 *   Sets timer, show same modal in 1 minute
 * [Remind in 5 minutes]
 *  Sets timer, show same modal in 5 minutes
 * [Remind in 15 minutes]
 *   Sets timer, show same modal in 15 minutes
 * [Continue watching]
 *   Closes modal
 */