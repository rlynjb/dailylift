<template>
  <div class="image-field">
    <div v-if="value">
      <!--
      <img :src="require(`~/assets/images/${ value }`)" />
      -->
      <img :src="value" />
    </div>

    <div v-else>
      <img src="~/assets/images/kirby.jpg" />

      <input type="file" id="myFile" name="filename"
        @input="setImage">
    </div>
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
.image-field {
  min-height: 12vw;
  width: 100%;
  border: 1px solid lightgray;
}
.image-field__btn {
  background: grey;
  width: 100%;
}
</style>