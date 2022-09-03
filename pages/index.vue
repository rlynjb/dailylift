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

    <h3 class="todays-workout__title">Today's Workout</h3>
    <div class="todays-workout">
      <div class="todays-workout__item"
        v-for="(exercise, exerciseIndex) in todaysWorkout" :key="'e'+exerciseIndex">
        <a class="main-unsetWorkoutBtn" @click="unsetWorkout(exerciseIndex)">-</a>
        <WorkoutCard :exercise="exercise" />
      </div>
    </div>

    <!--
    <div class="options">
      <div class="filter">
        reset
        <h6>Filter by:</h6>
        <div class="main-muscles">
          <a class="main-muscles__btn" @click="filter">Hamstrings</a>
          <a class="main-muscles__btn" @click="filter">Calves</a>
          <a class="main-muscles__btn" @click="filter">Chest</a>
          <a class="main-muscles__btn" @click="filter">Back</a>
          <a class="main-muscles__btn" @click="filter">Shoulders</a>
          <a class="main-muscles__btn" @click="filter">Triceps</a>
          <a class="main-muscles__btn" @click="filter">Biceps</a>
          <a class="main-muscles__btn" @click="filter">Forearms</a>
          <a class="main-muscles__btn" @click="filter">Trapezius</a>
          <a class="main-muscles__btn" @click="filter('core, oblique, upper abs')">Abs</a>
        </div>
      </div>

      <div class="views">
        list, card
      </div>
    </div>
    -->

    <div class="main">
      <div
        v-for="(exercise, exerciseIndex) in exercises" :key="'e'+exerciseIndex">
        <a class="main-setWorkoutBtn" @click="setWorkout(exercise)"
          :class="disableWorkout(exercise) ? 'disable' : ''"
        >
          +
        </a>
        <WorkoutCard :exercise="exercise" />
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
      todaysWorkout: [] as any[],
    }
  },

  methods: {
    filter(val: string = '') {
      console.log('filter', val)
    },
    disableWorkout(val: any) {
      return this.todaysWorkout.find((exercise) => {
        return val.id === exercise.id;
      });
    },
    setWorkout(val: Object) {
      // add to todays workout plan
      this.todaysWorkout.push(val);      
    },
    unsetWorkout(index: number) {
      this.todaysWorkout.splice(index, 1);
    },
  },
})
</script>

<style lang="postcss">
.header {
  @apply grid grid-cols-2 justify-between p-4 bg-black text-white;
}
.todays-workout {
  @apply grid sm:grid-cols-2 lg:grid-cols-4 gap-5 p-4;
}
.todays-workout__title {
  @apply p-4;
}
.main-setWorkoutBtn {
  background: #000;
  color: #fff;
  display: block;
  width: 100%;
  text-align: center;
  cursor: pointer;
}
.main-setWorkoutBtn.disable {
  pointer-events: none;
  background: grey;
}
.main-unsetWorkoutBtn {
  background: red;
  color: #fff;
  display: block;
  width: 100%;
  text-align: center;
  cursor: pointer;
}
.options {
  @apply grid grid-cols-2;
}
.filter {
  @apply p-4 col-span-1;
}
.views {
  @apply p-4 col-span-1;
}
.main {
  @apply grid sm:grid-cols-2 lg:grid-cols-4 gap-5 p-4;
}
.main-muscles {
  display: inline-block;
}
.main-muscles__btn {
  font-size: 0.9em;
  cursor: pointer;
}
</style>