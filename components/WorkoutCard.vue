<template>
  <div class="workout-card">
    <ImageField class="workout-card__image" :src="exercise.image" />

    <div class="workout-card__content">
      <h2 class="workout-card__title">
        {{ exercise.name }}
        <small>{{ exercise.muscles }}</small>
      </h2>
      <h6 class="workout-card__label">Sets - Weight</h6>
      <InputField
        class="workout-card__input"
        :val="exercise.sets.set1" />
      <InputField
        class="workout-card__input"
        :val="exercise.sets.set2" />
      <InputField
        class="workout-card__input"
        :val="exercise.sets.set3" />

      <h6 class="workout-card__label">Time</h6>
      <InputField class="workout-card__input" />
      <InputField class="workout-card__input" />
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
.workout-card {
  @apply grid grid-cols-12 p-4 gap-3 bg-primary;
}
.workout-card__image {
  @apply col-span-5;
}
.workout-card__content {
  @apply col-span-7 grid grid-cols-3 gap-3;
}
.workout-card__title {
  @apply col-span-3 mb-4;
  font-size: 1.4em;
  line-height: 1;
}
.workout-card__title small {
  @apply mt-1;
  font-size: 0.5em;
  display: block;
}
.workout-card__label {
  @apply col-span-3;
}
.workout-card__input {
  @apply col-span-1;
}
</style>