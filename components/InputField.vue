<template>
  <div class="input-field-container">
    <textarea rows="2"
      class="input-field"
      :placeholder="placeholder"
      :value="val"
      @input="update(label, $event)">
    </textarea>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

/*
  Output:
  @input - { label: '', val: '' }
*/

export default Vue.extend({
  name: 'InputField',
  props: {
    label: String,
    val: String,
    placeholder: String,
  },
  methods: {
    update(key: any, val: any) {
      this.$emit('input', { label: key, val: val.currentTarget.value })
    },
  },
})
</script>

<style lang="postcss" scoped>
.input-field {
  padding: 0.1em 0.4em;
  width: 100%;
}
.input-field:focus-visible {
  outline: none;
  border: 1px solid gray;
}
</style>