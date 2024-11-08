import { atom } from 'recoil'

export const typingSpeedState = atom<number>({
  key: 'typingSpeed',
  default: 0,
})
