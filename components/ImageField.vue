<template>
  <div class="image-field">
    <div v-if="value">
      <img :src="value" />
    </div>

    <label v-else class="file-upload">
      <input type="file" id="myFile" name="filename"
        @input="setImage">
      <span class="material-symbols-outlined">
        add_photo_alternate
      </span>
    </label>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'ImageField',
  props: {
    value: String,
  },

  methods: {
    setImage(file: any) {
      const reader = new FileReader();
      reader.onloadend = (event) => {        
        this.$emit('input', {
          label: 'image',
          val: reader.result
        })
      }
      reader.readAsDataURL(file.target.files[0]);
    }
  },
})
</script>

<style lang="postcss" scoped>
.file-upload input {
  overflow: hidden;
  width: 0;
  display: none;
}
</style>