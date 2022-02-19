<template>
  <dialog ref="dialog">This is a dialog.<br>
    <button>Close</button>
  </dialog>
</template>

<script>
  export default {
    name: 'TimeoutDialog',
    emits: ['modal:closed'],
    methods: {
      show() {
        const dialog = this.$refs.dialog

        dialog.querySelector('button').addEventListener('click', () => {
          dialog.close()
          this.$emit('modal:closed')
        })

        dialog.showModal()
      }
    }
  }
</script>

<style scoped>

</style>