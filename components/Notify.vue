<template>
  <div class="notify"
    v-show="value">
    {{ value }}
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: ['value'],

  mounted() {
    console.log('HELLO WORLD:: ', this.value);
  },

  watch: {
    value(val) {
      this.$emit('input', val);

      setTimeout(() => {
        this.$emit('input', '');
      }, 5000);
    },
  },
})
</script>

<style lang="postcss" scoped>
.notify {
  @apply fixed;

  bottom: 2em;
  margin: 0 auto;
  left: 0;
  right: 0;
  width: 12em;
  text-align: center;
  background: #f7c0fa;
  padding: 0.5em;
  border: 1px solid #000;
}
</style>