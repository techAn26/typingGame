import { atom } from 'recoil'
export const GameLevel = ['easy', 'normal', 'hard'] as const
export type GameLevelType = (typeof GameLevel)[number]

// ToDo Selectで管理できるようにする (datasetとgameでそれぞれ別の値として管理させたい)
export const levelState = atom<GameLevelType>({
  key: 'level',
  default: 'normal',
})
