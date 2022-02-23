<template>
  <timeout-dialog ref="modal" @modal:closed="onModalClosed" @action:delayed="onDelay"/>
</template>

<script>
import TimeoutDialog from './TimeoutDialog.vue'
import ModalReason from '../enum/ModalReason.js'

export default {
  name: 'App',
  components: { TimeoutDialog },
  props: {
    driver: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      watched: 0,
      hadBeenStopped: false
    }
  },
  methods: {
    showModal (reason) {
      this.$refs.modal.show(reason)
    },
    onModalClosed () {
      this.driver.play()
    },
    onDelay (seconds) {
      setTimeout(() => {
        this.showModal(ModalReason.TIMEOUT)
      }, seconds)
    }
  },
  mounted () {
    this.driver.whenPlaying = watched => {
      if (!this.hadBeenStopped && watched > 1 && this.driver.isInTheMiddle()) {
        this.showModal(ModalReason.HALF_EPISODE)
        this.driver.stop()
        this.hadBeenStopped = true
      }
    }
  }
}
</script>

<style scoped>

</style>