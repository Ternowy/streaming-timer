let watched = 0

let hadBeenStoped = false

document.body.insertAdjacentHTML('afterend', `<dialog id="stop-netflix-overlay">This is a dialog.<br><button>Close</button></dialog>`)

const showModal = (bridge) => {
  const dialog = document.querySelector('#stop-netflix-overlay')

  dialog.querySelector('button').addEventListener('click', function () {
    dialog.close()
    bridge.play()
  })

  dialog.showModal()
}

const mountApp = (video) => {
  const bridge = new window.VideoBridge(video)

  setInterval(() => {
    if (bridge.isPlaying()) {
      watched++
      console.log('watched triggered')
      if (bridge.isInTheMiddle() && watched > 1 && !hadBeenStoped) {
        showModal(bridge)
        bridge.stop()
        hadBeenStoped = true
      }
    }
    //clearInterval(repeater)
  }, 1000)
}

const observer = new MutationObserver(
  mutations => mutations.forEach(
    ({addedNodes}) => addedNodes.forEach(
      node => {
        if (node.querySelector('video')) {
          mountApp(node.querySelector('video'))
          observer.disconnect()
        }
      }
    )
  )
)

observer.observe(document.body, {
  childList: true,
  subtree: true
})

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