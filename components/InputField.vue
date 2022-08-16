<template>
  <div class="input-field-container">
    <input
      class="input-field"
      type="text"
      :value="val" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'InputField',
  props: {
    val: String,
  },
})
</script>

<style lang="postcss" scoped>
.input-field {
  border: 1px solid lightgray;
  padding: 0.1em 0.4em;
  width: 100%;
}
.input-field:focus-visible {
  outline: none;
  border: 1px solid gray;
}
</style>