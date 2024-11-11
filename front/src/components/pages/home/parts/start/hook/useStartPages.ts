import { useCallback, useEffect, useState } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { datasetIdState } from '../../../state/datasetIdAtom'
import { SampleData, SampleDataType } from '../../game/SampleData'
import { gameStateAtom } from '../../../state/gameStateAtom'
import { GameLevelType, levelState, GameLevel } from '../../../../common/type/levelAtom'

export type DatasetType = Pick<SampleDataType, 'id' | 'name' | 'level'>
// ToDO 後に削除 (fetchでデータを取得するようにする)
const SampleDataset: DatasetType[] = SampleData.map((d) => ({
  id: d.id,
  name: d.name,
  level: d.level,
}))

export const useStartPages = () => {
  const [level, setLevel] = useRecoilState(levelState)
  const datasets = SampleDataset
  const datasetOptions = datasets.filter((d) => d.level === level)

  // 初期値とデータセットの状態管理を修正
  const [dataset, setDataset] = useState<DatasetType>(() => {
    const initialOptions = datasets.filter((d) => d.level === level)
    return initialOptions[0]
  })

  const setDatasetId = useSetRecoilState(datasetIdState)

  // レベル変更時の処理を修正
  const handleLevelChange = (newLevel: GameLevelType) => {
    const newOptions = datasets.filter((d) => d.level === newLevel)
    if (newOptions.length > 0) {
      setDataset(newOptions[0])
    }
    setLevel(newLevel)
  }

  useEffect(() => {
    setDatasetId(dataset.id)
  }, [dataset, setDatasetId])

  // キー入力
  const [gameStatus, setGameStatus] = useRecoilState(gameStateAtom)
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        setGameStatus('gaming')
      }
    },
    [setGameStatus],
  )

  useEffect(() => {
    if (gameStatus === 'start') {
      window.addEventListener('keydown', handleKeyDown)
    } else {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [gameStatus, handleKeyDown])

  return {
    level,
    setLevel: handleLevelChange, // setLevelを新しい関数に置き換え
    options: GameLevel,
    dataset,
    setDataset,
    datasetOptions,
  }
}
