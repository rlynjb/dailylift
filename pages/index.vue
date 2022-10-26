<template>
  <div class="index-page">
    <notify v-model="notifyMsg" />

    <div class="header">
      <img class="header__logo"
        src="~/static/Daily.png" />
    </div>

    <h3 class="todays-workout__title">Routines</h3>
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
      <div class="main-card"
        v-for="(exercise, exerciseIndex) in exercises" :key="'e'+exerciseIndex">
        <WorkoutCard
          :exercise="exercise"
          @input="updateWorkout"
        />
        <div class="main-card__options">
          <a class="main-setWorkoutBtn" @click="setWorkout(exercise)"
            :class="disableWorkout(exercise) ? 'disable' : ''"
          >
            add
          </a>
          <a class="main-deleteBtn"
            @click="deleteWorkout(exercise)">delete</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Workouts } from '~/lib/data'
import Notify from '../components/Notify.vue';

export default Vue.extend({
  components: { Notify },
  name: 'IndexPage',
  data: () => {
    return {
      exercises: Workouts,
      todaysWorkout: [] as any[],
      displayAddWorkoutForm: false,
      notifyMsg: '',
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
        this.notifyMsg = `New Workout CREATED`;

        this.readWorkouts();
      })
      .catch(err => {
        this.notifyMsg = `Create New Workout FAIL: ${err}`;
      });
    },
    async readWorkouts() {
      return await this.$axios.$get(
        '/.netlify/functions/read_workouts'
      )
      .then(res => {
        // set items in this.exercises
        this.exercises = res;
      })
      .catch(err => {
        this.notifyMsg = `Read Workouts FAIL: ${ err }`;
      });
    },
    async updateWorkout(data: any) {
      return await this.$axios.$put(
        `/.netlify/functions/update_workout/${data.id}`,
        data
      )
      .then(res => {
        // find item in this.exercises and replace with latest respond data

        this.notifyMsg = `Workout UPDATED`;
      })
      .catch(err => {
        this.notifyMsg = `Update Workout FAIL: ${err}`;
      });
    },
    async deleteWorkout(data: any) {
      return await this.$axios.$delete(
        `/.netlify/functions/delete_workout/${data.id}`
      )
      .then(res => {
        this.notifyMsg = `Workout DELETED`;

        this.readWorkouts();
      })
      .catch(err => {
        this.notifyMsg = `Delete Workout FAIL: ${err}`;
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
.add-workout {
  @apply grid grid-cols-4 gap-5 p-4;
}
.add-workout__btn {
  @apply col-span-2 mb-2 place-self-end;
  width: 100%;
  display: block;
  text-align: center;
  border: 1px solid #000;
}
.add-workout__form {
  @apply col-span-4;
}
.main {
  @apply grid sm:grid-cols-2 lg:grid-cols-4 gap-5 p-4;
}
.main-card {
  @apply grid grid-cols-4;
}
.workout-card {
  @apply col-span-4;
}
.main-card__options {
  @apply col-start-3 col-span-2;
  text-align: right;
}
.main-setWorkoutBtn {
  @apply p-1 mr-1;
  text-align: center;
  cursor: pointer;
  border: 1px solid #000;
  font-size: 0.8em;
}
.main-setWorkoutBtn.disable {
  pointer-events: none;
  background: grey;
}
.main-deleteBtn {
  @apply p-1;
  cursor: pointer;
  text-align: center;
  border: 1px solid #000;
  font-size: 0.8em;
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