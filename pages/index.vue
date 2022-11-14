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
      v-show="selectedRoutine.workouts.length">
      <a class="deleteRoutineBtn"
        @click="deleteRoutine(selectedRoutine)">
        <span class="material-symbols-outlined">
          delete
        </span>  
      </a>
      <a class="closeRoutineBtn"
        @click="closeRoutine">
        <span class="material-symbols-outlined">
          close
        </span>  
      </a>

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

      <div ref="workoutList" class="routine-workout-list">
        <div class="todays-workout__item"
          v-for="(exercise, exerciseIndex) in selectedRoutine.workouts" :key="'e'+exerciseIndex">
          <div class="main-order">
            <b class="routine-workout_item_handle">{{ exerciseIndex + 1 }}</b>
            <br/>
            <br/>
            <br/>
            <a class="main-unsetWorkoutBtn" @click="unsetWorkout(exerciseIndex)">
              <span class="material-symbols-outlined">
                delete
              </span>
            </a>
          </div>
          <WorkoutCard
            :exercise="exercise"
            @input="updateWorkout"
          />
        </div>
      </div>
    </div>

    <div class="main">
      <div class="main-card">
        <WorkoutCard
          @input="createWorkout"
        />
      </div>

      <div class="main-card"
        v-for="(exercise, exerciseIndex) in exercises" :key="'e'+exerciseIndex">
        <div class="main-card__options">
          <a class="main-setWorkoutBtn" @click="setWorkout(exercise)">
            <span class="material-symbols-outlined">
              add
            </span>
          </a>
          <a class="main-deleteBtn"
            @click="deleteWorkout(exercise)">
            <span class="material-symbols-outlined">
              delete
            </span>
          </a>
        </div>

        <WorkoutCard
          :exercise="exercise"
          @input="updateWorkout"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Workouts } from '~/lib/data'
import Notify from '../components/Notify.vue';
import { debounce } from 'lodash'
import Sortable from 'sortablejs';

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

  /*
  watch: {
    "selectedRoutine": {
      handler(val) {
        this.updateRoutine(null, val);
      },
      deep: true,
    }
  },
  */

  methods: {
    loadRoutine(obj: any) {
      this.selectedRoutine = obj;

      const that = this;

      // fix for refs undefined: https://stackoverflow.com/questions/54355375/vue-js-refs-are-undefined-even-though-this-refs-shows-theyre-there
      if (this.$refs['workoutList']) {
        const el: any = that.$refs.workoutList;
        const sortable = Sortable.create(el, {
          handle: ".routine-workout_item_handle",
          onChange: function(evt: any) {
            // find object from list and use id and index to update list
            //console.log(evt.oldIndex, evt.newIndex)
            //console.log(that.selectedRoutine.workouts)

            let list = that.selectedRoutine.workouts;
            // store old item to a temp var
            let oldItem = list[evt.oldIndex];
            // place new item to old item index
            list[evt.oldIndex] = list[evt.newIndex];
            // place old item to new item index
            list[evt.newIndex] = oldItem;

            that.selectedRoutine.workouts = list;
            
            that.updateRoutine(null, that.selectedRoutine);
          }
        });
      }

      
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
        this.updateRoutine(null, this.selectedRoutine);
        this.notifyMsg = `Workout UPDATED`;
      })
      .catch(err => {
        this.notifyMsg = `Update Workout FAIL: ${err}`;
      });
    },
    async updateRoutine($event: any, obj: any) {
      const newData = {
        id: obj.id,
        name: $event ? $event.val : obj.name,
        workouts: obj.workouts
      }
      return await this.$axios.$put(
        `/.netlify/functions/update_routine/${obj.id}`,
        newData
      )
      .then(res => {
        this.$set(this.$data, 'selectedRoutine', res);
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
      this.updateRoutine(null, this.selectedRoutine);

      this.notifyMsg = `Workout Added to Routine`;
    },
    unsetWorkout(index: number) {
      this.selectedRoutine.workouts.splice(index, 1);
      this.updateRoutine(null, this.selectedRoutine);
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
  word-break: break-word;
  font-size: 0.9em;
}
.todays-workout {
  @apply grid grid-cols-4 p-4;
  background: #eeeeee;
}
.deleteRoutineBtn {
  @apply col-span-1;
}
.closeRoutineBtn {
  @apply col-span-1 col-start-4 text-right;
}
.routine__input {
  @apply col-span-4;
}
.todays-workout__title {
  @apply p-4 pb-0;
}
.routine-workout-list {
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
  @apply mb-8;
  display: block;
}
.main-setWorkoutBtn.disable {
  pointer-events: none;
  background: grey;
}
.main-deleteBtn {
  @apply place-self-end;
  cursor: pointer;
}

.todays-workout__item {
  @apply col-span-4 grid grid-cols-12 mb-2;
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
}
</style>