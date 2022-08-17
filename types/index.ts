export interface Workout {
  name: string,
  media: string,
  sets: Sets,
  minutes: string,
  seconds: string,
}

export interface Sets {
  set1: string,
  set2: string,
  set3: string,
}