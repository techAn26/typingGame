import { atom } from 'recoil'

export const datasetIdState = atom<string>({
  key: 'datasetId',
  default: '',
})
