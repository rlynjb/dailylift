<template>
  <div class="index-page">
    <div class="header">
      <img class="header__logo"
        src="~/static/Daily.png" />
    </div>

    <h3 class="todays-workout__title">Today's Workout</h3>
    <div class="todays-workout">
      <div class="todays-workout__item"
        v-for="(exercise, exerciseIndex) in todaysWorkout" :key="'e'+exerciseIndex">
        <a class="main-unsetWorkoutBtn" @click="unsetWorkout(exerciseIndex)">-</a>
        <WorkoutCard
          :exercise="exercise"
          @input="updateWorkout"
        />
      </div>
    </div>

    <div class="add-workout">
      <a class="add-workout__btn"
        @click="() => displayAddWorkoutForm = !displayAddWorkoutForm">
        <span v-if="!displayAddWorkoutForm">Add Workout</span>
        <span v-else>Cancel Add</span>
      </a>

      <div class="add-workout__form"
        v-if="displayAddWorkoutForm">
        <WorkoutCard
          @input="createWorkout"
        />
      </div>
    </div>

    <div class="main">
      <div
        v-for="(exercise, exerciseIndex) in exercises" :key="'e'+exerciseIndex">
        <a class="main-setWorkoutBtn" @click="setWorkout(exercise)"
          :class="disableWorkout(exercise) ? 'disable' : ''"
        >
          +
        </a>
        <WorkoutCard
          :exercise="exercise"
          @input="updateWorkout"
        />
        <a @click="deleteWorkout(exercise)">x</a>
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
      displayAddWorkoutForm: false,
    }
  },

  mounted() {
    this.readWorkouts();
  },

  methods: {
    async createWorkout(data: any) {
      return await this.$axios.$post(
        '/.netlify/functions/create_workout',
        JSON.stringify(data)
      )
      .then(res => {
        this.displayAddWorkoutForm = false;
        this.readWorkouts();
      })
      .catch(err => {
        //
      });
    },
    async readWorkouts() {
      return await this.$axios.$get(
        '/.netlify/functions/read_workouts'
      )
      .then(res => {
        // set items in this.exercises
        this.exercises = res;
      });
    },
    async updateWorkout(data: any) {
      return await this.$axios.$put(
        `/.netlify/functions/update_workout/${data.id}`,
        data
      )
      .then(res => {
        // find item in this.exercises and replace with latest respond data
      });
    },
    async deleteWorkout(data: any) {
      return await this.$axios.$delete(
        `/.netlify/functions/delete_workout/${data.id}`
      )
      .then(res => {
        this.readWorkouts();
      });
    },

    disableWorkout(val: any) {
      return this.todaysWorkout.find((exercise) => {
        return val.name === exercise.name;
      });
    },
    setWorkout(val: Object) {
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
  @apply grid grid-cols-2 justify-between p-4;
}
.header__logo {
  max-width: 15em;
}
.todays-workout {
  @apply grid sm:grid-cols-2 lg:grid-cols-4 gap-5 p-4;
}
.todays-workout__title {
  @apply p-4;
}
.add-workout__btn {
  background: green;
  color: #fff;
  width: 100%;
  display: block;
  text-align: center;
}
.main {
  @apply grid sm:grid-cols-2 lg:grid-cols-4 gap-5 p-4;
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
</style>