import { useRecoilState } from 'recoil'
import { GameLevel } from '../../../common/type/levelAtom'
import { levelState } from '../../../common/type/levelAtom'

export const useCreatePages = () => {
  const options = GameLevel
  const [difficulty, setDifficulty] = useRecoilState(levelState)

  return { difficulty, setDifficulty, options }
}
