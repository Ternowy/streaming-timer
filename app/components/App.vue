<template>
  <timeout-dialog ref="modal" @modal:closed="onModalClosed"/>
</template>

<script>
  import TimeoutDialog from './TimeoutDialog.vue'

  export default {
    name: 'App',
    components: {TimeoutDialog},
    props: {
      driver: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        watched: 0,
        hadBeenStopped: false
      }
    },
    methods: {
      showModal() {
        this.$refs.modal.show()
      },
      onModalClosed() {
        this.driver.play()
      }
    },
    mounted() {
      setInterval(() => {
        if (this.driver.isPlaying()) {
          this.watched++
          console.log('watched triggered')
          if (this.driver.isInTheMiddle() && this.watched > 1 && !this.hadBeenStopped) {
            this.showModal()
            this.driver.stop()
            this.hadBeenStopped = true
          }
        }
        //clearInterval(repeater)
      }, 1000)
    }
  }
</script>

<style scoped>

</style>