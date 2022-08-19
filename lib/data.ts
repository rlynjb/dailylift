import { IWorkout, IWorkouts } from '~/types/index'

export const Workouts: IWorkout[] = [
  {
    media: 'kirby.jpg',
    name: 'workout 1',
    muscles: 'biceps',
    sets: {
      set1: '12',
      set2: '12',
      set3: '13',
    },
    minutes: '0',
    seconds: '0'
  },
  {
    media: 'kirby.jpg',
    name: 'workout 2',
    muscles: 'triceps',
    sets: {
      set1: '12',
      set2: '12',
      set3: '12',
    },
    minutes: '0',
    seconds: '0'
  }
];