export interface IWorkout {
  name: string,
  muscles: string,
  media: string,
  sets: ISets,
  minutes: string,
  seconds: string,
}

export interface ISets {
  set1: string,
  set2: string,
  set3: string,
}

/**
 * Learning to define interface of array containing objects
 * ref: https://stackoverflow.com/questions/25469244/how-can-i-define-an-interface-for-an-array-of-objects
 * 
 * Intro to Typescript Interfaces or more!
 * ref: https://www.educative.io/blog/typescript-interfaces
 */
// Not using it but thought to implement for learning purpose
export interface IWorkouts extends Array<IWorkout>{}