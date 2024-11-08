import { atom } from 'recoil'
export type GameStatus = 'start' | 'gaming' | 'end'

export const gameStateAtom = atom<GameStatus>({
  key: 'gameStateAtom',
  default: 'start',
})
