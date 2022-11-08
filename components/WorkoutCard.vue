<template>
  <div class="workout-card">
    <ImageField class="workout-card__image"
      label="image"
      v-model="exercise.image"
      @input="update"
    />

    <h3 class="workout-card__title">
      <InputField
        class="workout-card__input"
        label="name"
        :val="exercise.name"
        @input="update"
        placeholder="Name of Workout"
      />
      <small>
        <InputField
          class="workout-card__input"
          label="muscles"
          :val="exercise.muscles"
          @input="update"
          placeholder="ex. Abs, Bicep, Tricep, Glutes, etc"
        />
      </small>
      <small>
        <InputField
          class="workout-card__input"
          placeholder="ex. set1-10reps, set2-10reps, 2x10"
          :val="exercise.sets"
          label="sets"
          @input="update"
        />
      </small>
    </h3>

    <!--
    <button class="detailBtn" @click="() => toggleDetail = !toggleDetail">Detail</button>

    <div class="workout-card__content"
      v-if="toggleDetail">
      <div class="workout-card__reps">
      <h6 class="workout-card__label">Sets</h6>
      <InputField
        class="workout-card__input"
        label="set1"
        :val="exercise.set1"
        @input="update"
      />
      <InputField
        class="workout-card__input"
        label="set2"
        :val="exercise.set2"
        @input="update"
      />
      <InputField
        class="workout-card__input"
        label="set3"
        :val="exercise.set3"
        @input="update"
      />

      <h6 class="workout-card__label">Weight</h6>
      <InputField
        class="workout-card__input"
        label="weight1"
        :val="exercise.weight1"
        @input="update"
      />
      <InputField
        class="workout-card__input"
        label="weight2"
        :val="exercise.weight2"
        @input="update"
      />
      <InputField
        class="workout-card__input"
        label="weight3"
        :val="exercise.weight3"
        @input="update"
      />

      <h6 class="workout-card__label">Time</h6>
      <InputField
        class="workout-card__input"
        label="minutes"
        :val="exercise.minutes"
        @input="update"
      />
      <InputField
        class="workout-card__input"
        label="seconds"
        :val="exercise.seconds"
        @input="update"
      />
      </div>
    </div>
    -->
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
  },
})
</script>

<style lang="postcss" scoped>
.workout-card {
  @apply grid grid-cols-12 p-4 gap-3 bg-primary;
}
.workout-card__image {
  @apply col-span-5;
}
.workout-card__title {
  @apply col-span-7;
  line-height: 1.3;
  font-size: 0.7em;
}
.workout-card__title small {
  @apply mt-1;
  font-size: 0.6em;
  display: block;
}
.detailBtn {
  background: #e2e2e2;
  width: fit-content;
  padding: 0.2em 1em;
}
.workout-card__content {
  @apply col-span-12 grid grid-cols-2;
}
.workout-card__reps {
  @apply col-span-12 grid grid-cols-3 gap-2;
}
.workout-card__label {
  @apply col-span-3;
}
.workout-card__input {
  @apply col-span-1;
}
</style>