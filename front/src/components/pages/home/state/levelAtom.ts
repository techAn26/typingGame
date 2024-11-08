import { atom } from 'recoil'
export const GameLevel = ['easy', 'normal', 'hard'] as const
export type GameLevelType = (typeof GameLevel)[number]

export const levelState = atom<GameLevelType>({
  key: 'level',
  default: 'normal',
})
