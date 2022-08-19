<template>
  <div class="image-field">
    <img v-if="src" :src="require(`~/assets/images/${src}`)" />
    <img v-else src="~/assets/images/kirby.jpg" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'ImageField',
  props: {
    src: String,
  },
})
</script>

<style lang="postcss" scoped>
.image-field {
  min-height: 12vw;
  width: 100%;
  border: 1px solid lightgray;
}
</style>