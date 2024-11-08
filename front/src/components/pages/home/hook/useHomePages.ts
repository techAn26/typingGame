import { useRecoilValue } from 'recoil'
import { gameStateAtom } from '../state/gameStateAtom'

export const useHomePages = () => {
  const gameStatus = useRecoilValue(gameStateAtom)

  return {
    gameStatus,
  }
}
