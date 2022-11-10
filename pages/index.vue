<template>
  <div class="index-page">
    <notify v-model="notifyMsg" />
    <div class="header">
      <img class="header__logo"
        src="~/static/Daily.png" />
    </div>

    <h3 class="todays-workout__title">Routines</h3>

    <div class="routines">
      <div class="routine"
        v-for="(routine, routineIndex) in routines" :key="'r'+routineIndex">
        <h6 @click="loadRoutine(routine)">{{ routine.name }}</h6>
      </div>
    </div>

    <div class="todays-workout"
      v-if="selectedRoutine.workouts.length">
      <a class="deleteRoutineBtn"
        @click="deleteRoutine(selectedRoutine)">delete</a>
      <a class="closeRoutineBtn"
        @click="closeRoutine">close</a>

      <InputField
        v-if="selectedRoutine.name === ''"
        class="routine__input"
        label="name"
        :val="selectedRoutine.name"
        @input="debounceCreateRoutine($event, selectedRoutine.workouts)"
        placeholder="Type Routine name to save"
      />
      <InputField
        v-else
        class="routine__input"
        label="name"
        :val="selectedRoutine.name"
        @input="updateRoutine($event, selectedRoutine)"
        placeholder="Type Routine name to save"
      />

      <div class="todays-workout__item"
        v-for="(exercise, exerciseIndex) in selectedRoutine.workouts" :key="'e'+exerciseIndex">
        <div class="main-order">
          <b>{{ exerciseIndex + 1 }}</b>
          <br/>
          <br/>
          <a class="main-unsetWorkoutBtn" @click="unsetWorkout(exerciseIndex)">X</a>
        </div>
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
          <a class="main-setWorkoutBtn" @click="setWorkout(exercise)">
            +
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
import { debounce } from 'lodash'

export default Vue.extend({
  components: { Notify },
  name: 'IndexPage',
  data: () => {
    return {
      exercises: Workouts,
      //todaysWorkout: [] as any[],
      displayAddWorkoutForm: false,
      notifyMsg: '',
      selectedRoutine: {
        id: '',
        name: '',
        workouts: [] as any[]
      },
      routines: [] as any[],
    }
  },

  mounted() {
    this.readWorkouts();
    this.readRoutines();
  },

  created() {
    this.debounceCreateRoutine = debounce(this.debounceCreateRoutine, 2000);
  },

  watch: {
    "selectedRoutine": {
      handler(val) {
        this.updateRoutine(null, val);
      },
      deep: true,
    }
  },

  methods: {
    loadRoutine(obj: any) {
      this.selectedRoutine = obj;
    },
    closeRoutine() {
      this.selectedRoutine = {
        id: '',
        name: '',
        workouts: [] as any[]
      }
    },
    /*
      NOTE:
      really hacky way to resolve typescript with debounce and async issue
    */
    debounceCreateRoutine($event: any, workouts: any) {
      this.createRoutine($event, workouts);
    },
    async createRoutine($event: any, workouts: any) {
      if ($event === null && workouts === null) return;

      /**
       * save routine object in routine collection
      */
      const data = {
        name: $event.val,
        workouts
      }
      return await this.$axios.$post(
        '/.netlify/functions/create_routine',
        JSON.stringify(data)
      )
      .then(res => {
        this.notifyMsg = `New Routine CREATED`;

        this.readRoutines();
      })
      .catch(err => {
        this.notifyMsg = `Create New Routine FAIL: ${err}`;
      });
    },

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
        this.exercises = res;
      })
      .catch(err => {
        this.notifyMsg = `Read Workouts FAIL: ${ err }`;
      });
    },
    async readRoutines() {
      return await this.$axios.$get(
        '/.netlify/functions/read_routines'
      )
      .then(res => {
        this.routines = res;
      })
      .catch(err => {
        this.notifyMsg = `Read Routines FAIL: ${ err }`;
      });
    },
    async updateWorkout(data: any) {
      return await this.$axios.$put(
        `/.netlify/functions/update_workout/${data.id}`,
        data
      )
      .then(res => {
        this.notifyMsg = `Workout UPDATED`;
      })
      .catch(err => {
        this.notifyMsg = `Update Workout FAIL: ${err}`;
      });
    },
    async updateRoutine($event: any, obj: any) {
      const newData = {
        id: obj.id,
        name: null ? this.selectedRoutine.name : obj.val,
        workouts: obj.workouts
      }
      return await this.$axios.$put(
        `/.netlify/functions/update_routine/${obj.id}`,
        newData
      )
      .then(res => {
        this.readRoutines();
        this.notifyMsg = `Routine UPDATED`;
      })
      .catch(err => {
        this.notifyMsg = `Update Routine FAIL: ${err}`;
      });
    },
    async deleteWorkout(data: any) {
      return await this.$axios.$delete(
        `/.netlify/functions/delete_workout/${data.id}`
      )
      .then(res => {
        this.notifyMsg = `Workout DELETED`;

        this.readWorkouts();
        this.closeRoutine();
      })
      .catch(err => {
        this.notifyMsg = `Delete Workout FAIL: ${err}`;
      });
    },
    async deleteRoutine(data: any) {
      return await this.$axios.$delete(
        `/.netlify/functions/delete_routine/${data.id}`
      )
      .then(res => {
        this.notifyMsg = `Routine DELETED`;

        this.readRoutines();
      })
      .catch(err => {
        this.notifyMsg = `Delete Routine FAIL: ${err}`;
      });
    },
    setWorkout(val: any) {
      this.selectedRoutine.workouts.push(val);
      this.notifyMsg = `Workout Added to Routine`;
    },
    unsetWorkout(index: number) {
      this.selectedRoutine.workouts.splice(index, 1);
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
.routines {
  @apply grid grid-cols-4 p-4 gap-3;
}
.routine {
  background: #efefef;
  padding: 10px;
  line-height: 1;
  color: gray;
}
.todays-workout {
  @apply grid sm:grid-cols-2 lg:grid-cols-4 gap-5 p-4;
  background: #eeeeee;
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
  @apply grid grid-cols-12;
}
.workout-card {
  @apply col-span-11;
}
.main-card__options {
  @apply col-span-1;
}
.main-setWorkoutBtn {
  @apply p-1 mr-1;
  text-align: center;
  cursor: pointer;
  border: 1px solid #000;
  font-size: 0.7em;
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
  font-size: 0.7em;
}

.todays-workout__item {
  @apply grid grid-cols-12;
}
.main-order {
  @apply col-span-1;
  text-align: center;
}
.todays-workout__item .workout-card {
  @apply col-span-11;
}
.main-unsetWorkoutBtn {
  @apply col-span-4 col-start-11 place-self-end;
  text-align: center;
  cursor: pointer;
  border: 1px solid #000;
  font-size: 0.7em;
  padding: 5px;
}
</style>