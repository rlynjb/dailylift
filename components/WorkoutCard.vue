<template>
  <div class="workout-card main-card">
    <h2 class="main-title">
      {{ exercise.name }}
      <small>{{ exercise.muscles }}</small>
    </h2>

    <a class="main-addWorkout">+</a>

    <ImageField class="main-image" :src="exercise.image" />

    <div class="main-content">
      <h6 class="main-content__label">Sets - Weight</h6>
      <InputField
        class="main-content__input"
        :val="exercise.sets.set1" />
      <InputField
        class="main-content__input"
        :val="exercise.sets.set2" />
      <InputField
        class="main-content__input"
        :val="exercise.sets.set3" />

      <h6 class="main-content__label">Time</h6>
      <InputField class="main-content__input" />
      <InputField class="main-content__input" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'WorkoutCard',
  props: {
    exercise: Object,
  }
})
</script>

<style lang="postcss" scoped>
.main-card {
  @apply grid grid-cols-12 p-4 bg-primary;
}
.main-title {
  @apply col-span-10 mb-4;
  font-size: 1.4em;
  line-height: 1;
}
.main-title small {
  @apply mt-1;
  font-size: 0.5em;
  display: block;
}
.main-addWorkout {
  @apply col-span-2;
}
.main-image {
  @apply col-span-12;
}
.main-content {
  @apply col-span-12 grid grid-cols-3 gap-3;
}
.main-content__label {
  @apply col-span-3;
}
.main-content__input {
  @apply col-span-1;
}
</style>