import { atom } from 'recoil'

export const datasetIdState = atom<string>({
  key: 'datasetIdState',
  // id=0は存在しないデータセットを表す
  default: '1',
})
