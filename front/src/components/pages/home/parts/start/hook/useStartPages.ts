import { useState } from 'react'

const GameLevel = ['easy', 'normal', 'hard'] as const
type GameLevelType = (typeof GameLevel)[number]

type DatasetType = {
  id: string
  name: string
  level: GameLevelType
}
const SampleDataset: DatasetType[] = [
  {
    id: '1',
    name: '魚大図鑑',
    level: 'easy',
  },
  {
    id: '2',
    name: 'プログラミング専門用語',
    level: 'normal',
  },
  {
    id: '3',
    name: '歴史上の出来事集',
    level: 'hard',
  },
]

export const useStartPages = () => {
  const [level, setLevel] = useState<GameLevelType>('normal')
  const [dataset, setDataset] = useState<DatasetType>(SampleDataset[0])
  const datasets = SampleDataset
  const datasetOptions = datasets.filter((d) => d.level === level)

  return {
    level,
    setLevel,
    levelOptions: GameLevel,
    dataset,
    setDataset,
    datasetOptions,
  }
}
