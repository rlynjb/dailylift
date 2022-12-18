<template>
  <div class="workout-card">
    <InputField
      class="workout-card__input workout-card__title"
      label="title"
      :val="exercise.title"
      @input="update"
      placeholder="Title"
      rows="1"
    />
    <InputField
      class="workout-card__input workout-card__content"
      label="content"
      :val="exercise.content"
      @input="update"
      placeholder="Desc"
      rows="2"
    />

    <ImageField class="workout-card__image"
      label="image"
      v-model="exercise.image"
      @input="update"
    />

    <div class="main-card__options"
      v-if="exercise.title">
      <a class="main-deleteBtn"
        @click="deleteWorkout(exercise)">
        <span class="material-symbols-outlined">
          delete
        </span>
      </a>
      <a class="main-setWorkoutBtn" @click="setWorkout(exercise)">
        <span class="material-symbols-outlined">
          add
        </span>
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
//import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { IWorkout } from '~/types/index'
import { debounce } from 'lodash'

/**
 * Learning how to use TS interface as Props
 * refs:
 * https://frontendsociety.com/using-a-typescript-interfaces-and-types-as-a-prop-type-in-vuejs-508ab3f83480
 * https://github.com/vuejs/vue/pull/6856
 * https://v2.vuejs.org/v2/guide/typescript.html#Annotating-Props
 * https://www.codecademy.com/learn/learn-typescript/modules/learn-typescript-type-narrowing/cheatsheet
 */

/*
export default defineComponent({
  name: 'WorkoutCard',
  props: {
    exercise: {
      type: Object as PropType<IWorkout>
    },
  },
});
*/

export default Vue.extend({
  name: 'WorkoutCard',
  props: {
    exercise: {
      type: Object as PropType<IWorkout>,
      default: () => {
        return {}
      }
    },
  },

  data() {
    return {
      toggleDetail: false,
    }
  },

  created() {
    // ref: https://splunktool.com/how-to-use-lodash-debounce-in-vuejs-watch-with-typescript
    this.update = debounce(this.update, 2000);
  },

  methods: {
    update(obj: any) {
      this.$set(this.exercise, obj.label, obj.val);
      this.$emit('input', this.exercise);
    },
    deleteWorkout(obj: any) {
      this.$emit('deleteNote', obj);
    },
    setWorkout(obj: any) {
      this.$emit('setNote', obj);
    },
  },
})
</script>

<style lang="postcss" scoped>
.workout-card {
  @apply grid grid-cols-12 p-4 gap-3;
  border: 1px solid #dfdfdf;
  border-radius: 5px;
}
.workout-card__title {
  @apply col-span-12;
  line-height: 1.3;
  font-size: 0.8em;
}
.workout-card__content{
  @apply col-span-12 mt-1;
  font-size: 0.9em;
  display: block;
}
.workout-card__image {
  @apply col-span-12;
}
.main-card__options {
  @apply col-span-12 grid grid-cols-12;
}
.main-setWorkoutBtn {
  @apply col-span-1;
  display: block;
}
.main-setWorkoutBtn.disable {
  pointer-events: none;
  background: grey;
}
.main-deleteBtn {
  @apply col-span-1;
  cursor: pointer;
}
</style>