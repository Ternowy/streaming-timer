<template>
  <dialog class="modal" ref="dialog">
    <div class="modal-container">
      <div class="modal-message">
        <h1>{{ modalContent.heading }}</h1>
        <p>{{ modalContent.description }}</p>
      </div>

      <button @click="finish" class="btn">[Ok, it's enough]</button>
      <button @click="remind(5)" class="btn">[Remind in 5 minutes]</button>
      <button @click="remind(15)" class="btn">[Remind in 15 minutes]</button>
      <button @click="close" class="btn">[Continue watching]</button>
    </div>
  </dialog>
</template>

<script>
import ModalReason from '../enum/ModalReason.js'

export default {
  name: 'TimeoutDialog',
  emits: ['modal:closed'],
  data () {
    return {
      reasonOpened: ModalReason.HALF_EPISODE,
    }
  },
  computed: {
    modalContent() {
      const content = {
        [ModalReason.HALF_EPISODE]: {
          heading: 'It\'s time to take a pause',
          description: 'Consider to stop now and continue later from the same place.'
        },
        [ModalReason.TIMEOUT]: {
          heading: 'The time is out!',
          description: 'The timer, you\'ve set is out, set a new one or make a pause.'
        },
      }

      return content[this.reasonOpened]
    }
  },
  methods: {
    remind (inMinutes) {
      this.$emit('action:delayed', inMinutes * 60)
    },
    finish () {
      chrome.runtime.sendMessage('close-tab')
    },
    show (reason) {
      this.reasonOpened = reason
      this.$refs.dialog.showModal()
    },
    close () {
      this.$refs.dialog.close()
      this.$emit('modal:closed')
    }
  }
}
</script>

<style scoped>

</style>