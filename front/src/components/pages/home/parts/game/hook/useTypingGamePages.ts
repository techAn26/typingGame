import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { SampleData } from '../SampleData'
import { useRecoilState } from 'recoil'
import { datasetIdState } from '../../../state/datasetIdAtom'
import { typing } from '../../../logic/typing'
import { GameStatus } from '../../../state/gameStateAtom'
import { typingSpeedState } from '../../../state/typingSpeedAtom'
import { statsAtom } from '../../../state/statsAtom'

type Props = {
  gameStatus: GameStatus
  setGameStatus: (status: GameStatus) => void
  timeLeftDefault: number
}

const SampleDataset = SampleData

export const useTypingGamePages = ({ gameStatus, setGameStatus, timeLeftDefault = 60 }: Props) => {
  const [datasetId, setDatasetId] = useRecoilState(datasetIdState)
  const [timeLeft, setTimeLeft] = useState(timeLeftDefault)
  const [correctTypedCount, setCorrectTypedCount] = useState(0)
  const dataset = useMemo(() => SampleDataset.find((d) => d.id === datasetId)?.dataset, [datasetId])
  if (!dataset) throw new Error('dataset not found')

  const shuffleDataset = useMemo(() => {
    return [...dataset].sort(() => Math.random() - 0.5)
  }, [dataset])
  const [datasetIndex, setDatasetIndex] = useState(0)
  const [currentTargetText, setCurrentTargetText] = useState(shuffleDataset[datasetIndex])
  const [userTypedText, setUserTypedText] = useState('')

  const [stats, setStats] = useRecoilState(statsAtom)

  // タイピング
  useEffect(() => {
    const { restTargetText, removedTargetText, correctTypedNum } = typing(currentTargetText.hiragana, userTypedText)
    if (restTargetText.length === 0) {
      setCurrentTargetText(shuffleDataset[datasetIndex + 1])
      // 最後のデータセットの場合はリセット (+2にしている理由は、stateの更新の仕様を考慮するため)
      if (datasetIndex + 2 === shuffleDataset.length) {
        setDatasetIndex(0)
        // データセットIDを同じ値で更新し、シャッフルデータを再ロードする
        setDatasetId(datasetId)
      } else {
        setDatasetIndex((prev) => prev + 1)
      }
    } else {
      if (removedTargetText.length > 0) {
        setCurrentTargetText((prev) => ({
          ...prev,
          hiragana: restTargetText,
        }))
        setUserTypedText('')
      } else {
        // 30文字以上入力されたらリセット
        if (userTypedText.length > 30) {
          setUserTypedText('')
        }
      }
    }
    setCorrectTypedCount((prev) => prev + correctTypedNum)
  }, [userTypedText, currentTargetText.hiragana, shuffleDataset, datasetIndex, datasetId, setDatasetId])

  // タイピング速度
  const [typingSpeed, setTypingSpeed] = useRecoilState(typingSpeedState)
  useEffect(() => {
    const typingTime = timeLeftDefault - timeLeft
    setTypingSpeed(typingTime <= 0 ? 0 : Number((correctTypedCount / typingTime).toFixed(2)))
  }, [correctTypedCount, timeLeft, timeLeftDefault, setTypingSpeed])

  // タイピング速度が更新されたときの処理
  useEffect(() => {
    if (typingSpeed > stats.maxSpeed) {
      setStats((prev) => ({
        ...prev,
        maxSpeed: typingSpeed,
        speedHistory: [...prev.speedHistory, typingSpeed],
      }))
    } else {
      setStats((prev) => ({
        ...prev,
        speedHistory: [...prev.speedHistory, typingSpeed],
      }))
    }
  }, [typingSpeed, stats.maxSpeed, stats.speedHistory, setStats])

  // キー入力
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (gameStatus !== 'gaming') return
      const isCorrectType = typing(currentTargetText.hiragana, userTypedText + e.key.toLowerCase()).correctTypedNum > 0
      setStats((prev) => ({
        ...prev,
        totalTyped: prev.totalTyped + 1,
        correctTyped: prev.correctTyped + (isCorrectType ? 1 : 0),
      }))
      if (e.key === 'Escape') {
        setUserTypedText('')
        setGameStatus('start')
      } else {
        setUserTypedText((prev) => prev + e.key.toLowerCase())
      }
    },
    [gameStatus, currentTargetText.hiragana, userTypedText, setUserTypedText, setGameStatus, setStats],
  )
  useEffect(() => {
    if (gameStatus === 'gaming') {
      window.addEventListener('keydown', handleKeyDown)
    }
  }, [gameStatus, handleKeyDown])

  // タイマー
  const interval = useRef<NodeJS.Timeout | null>(null)
  useEffect(() => {
    interval.current = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)
    return () => {
      if (interval.current) {
        clearInterval(interval.current)
      }
    }
  }, [])

  // タイマー終了
  useEffect(() => {
    if (timeLeft <= 0) {
      if (interval.current) {
        clearInterval(interval.current)
      }
      window.removeEventListener('keydown', handleKeyDown)
      setGameStatus('end')
    }
  }, [timeLeft, handleKeyDown, setGameStatus])

  return {
    timeLeft,
    typingSpeed,
    currentTargetText,
  }
}
