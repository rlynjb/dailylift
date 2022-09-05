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

      <h6 class="workout-card__label">Time</h6>
      <InputField class="workout-card__input" />
      <InputField class="workout-card__input" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
//import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { IWorkout } from '@/types/index'

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

  watch: {
    exercise: {
      handler(val) {
        debugger
      },
      deep: true,
    }
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
.workout-card__content {
  @apply col-span-7 grid grid-cols-3 gap-3;
}
.workout-card__title {
  @apply col-span-3 mb-4;
  font-size: 1.4em;
  line-height: 1.3;
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