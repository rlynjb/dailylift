<template>
  <div class="index-page">
    <div class="header">
      <h3>Daily Lift</h3>
      
      <!--
      <div class="text-right">
        add
      </div>
      -->
    </div>

    <!--
    <div class="top-workouts">
      <h3>Top fave 4</h3>
    </div>
    -->

    <!--
    <div class="filter">
      filter or sorting feature
    </div>
    -->

    <div class="main">
      <div class="main-card"
        v-for="(exercise, exerciseIndex) in exercises" :key="'e'+exerciseIndex">
        <ImageField :src="exercise.media" />

        <h2 class="main-title">
          {{ exercise.name }}
          <small>{{ exercise.muscles }}</small>
        </h2>

        <div class="main-content">
          <h6 class="main-content__label">Sets</h6>
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
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Workouts } from '~/lib/data'

export default Vue.extend({
  name: 'IndexPage',
  data: () => {
    return {
      exercises: Workouts,
    }
  },
})
</script>

<style lang="postcss">
.header {
  @apply grid grid-cols-2 justify-between p-4 bg-black text-white;
}
.filter {
  @apply p-4;
}
.main {
  @apply grid grid-cols-4 gap-5 p-4;
}
.main-card {
  @apply p-4 bg-primary;
}
.main-title {
  @apply mt-4 mb-4;
  font-size: 1.4em;
  line-height: 1;
}
.main-title small {
  @apply mt-1;
  font-size: 0.5em;
  display: block;
}
.main-content {
  @apply grid grid-cols-3 gap-3;
}
.main-content__label {
  @apply col-span-3;
}
.main-content__input {
  @apply col-span-1;
}
</style>