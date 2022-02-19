<template>
  <dialog ref="dialog">This is a dialog.<br>
    <button @close="onClose">Close</button>
  </dialog>
</template>

<script>
  export default {
    name: 'TimeoutDialog',
    emits: ['modal:closed'],
    methods: {
      show() {
        this.$refs.dialog.showModal()
      },
      onClose() {
        this.$refs.dialog.close()
        this.$emit('modal:closed')
      }
    }
  }
</script>

<style scoped>

</style>