export interface IWorkout {
  id: string,
  name: string,
  muscles: string,
  image: string,
  sets: string
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