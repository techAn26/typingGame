import { atom } from 'recoil'

export const statsAtom = atom({
  key: 'statsAtom',
  default: {
    totalTyped: 0,
    correctTyped: 0,
    maxSpeed: 0,
    speedHistory: [] as number[],
  },
})
