import { useCallback, useEffect, useMemo, useState, useRef } from 'react'
import { SampleData } from '../SampleData'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
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

const processTyping = (target: string, input: string) => {
  const { restTargetText, correctTypedNum } = typing(target, input)
  return {
    restTargetText,
    correctTypedNum,
    isCompleted: restTargetText.length === 0,
  }
}

export const useTypingGamePages = ({ gameStatus, setGameStatus, timeLeftDefault = 60 }: Props) => {
  const datasetId = useRecoilValue(datasetIdState)
  const [timeLeft, setTimeLeft] = useState(timeLeftDefault)
  const [correctTypedCount, setCorrectTypedCount] = useState(0)
  const [typingSpeed, setTypingSpeed] = useRecoilState(typingSpeedState)
  const setStats = useSetRecoilState(statsAtom)

  const dataset = useMemo(() => {
    const found = SampleDataset.find((d) => d.id === datasetId)?.dataset
    if (!found) throw new Error('dataset not found')
    return found
  }, [datasetId])

  const shuffleDataset = useMemo(() => {
    return [...dataset].sort(() => Math.random() - 0.5)
  }, [dataset])

  const [datasetIndex, setDatasetIndex] = useState(0)
  const [currentTargetText, setCurrentTargetText] = useState(shuffleDataset[0])
  const [userTypedText, setUserTypedText] = useState('')

  const isGaming = useRef(false)

  // タイピング速度の計算
  useEffect(() => {
    if (gameStatus !== 'gaming') return

    const typingTime = timeLeftDefault - timeLeft
    if (typingTime <= 0) return

    const newSpeed = Number((correctTypedCount / typingTime).toFixed(2))
    setTypingSpeed(newSpeed)
  }, [correctTypedCount, timeLeft, timeLeftDefault, gameStatus, setTypingSpeed, setStats])

  // 統計情報の更新
  useEffect(() => {
    if (gameStatus !== 'gaming' || typingSpeed === 0) return

    setStats((prev) => ({
      ...prev,
      maxSpeed: Math.max(prev.maxSpeed, typingSpeed),
      speedHistory: [...prev.speedHistory, typingSpeed],
    }))
  }, [typingSpeed, gameStatus, setStats])

  // テキスト更新処理
  const updateText = useCallback(
    (nextIndex: number) => {
      const shouldReset = nextIndex >= shuffleDataset.length
      const newIndex = shouldReset ? 0 : nextIndex

      setDatasetIndex(newIndex)
      setCurrentTargetText(shuffleDataset[newIndex])
      setUserTypedText('')
    },
    [shuffleDataset, setDatasetIndex, setCurrentTargetText, setUserTypedText],
  )

  // タイピング処理
  const handleTyping = useCallback(
    (input: string) => {
      const { restTargetText, correctTypedNum, isCompleted } = processTyping(currentTargetText.hiragana, input)

      if (isCompleted) {
        updateText(datasetIndex + 1)
      } else {
        setCurrentTargetText((prev) => ({
          ...prev,
          hiragana: restTargetText,
        }))
        setUserTypedText(input.length > 30 ? '' : input)
      }

      if (correctTypedNum > 0) {
        setCorrectTypedCount((prev) => prev + correctTypedNum)
      }
    },
    [currentTargetText.hiragana, datasetIndex, updateText],
  )

  // キー入力処理
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (gameStatus !== 'gaming') return

      if (e.key === 'Escape') {
        setUserTypedText('')
        setGameStatus('start')
        return
      }

      const newInput = userTypedText + e.key.toLowerCase()
      const { correctTypedNum } = processTyping(currentTargetText.hiragana, newInput)

      setStats((prev) => ({
        ...prev,
        totalTyped: prev.totalTyped + 1,
        correctTyped: prev.correctTyped + (correctTypedNum > 0 ? 1 : 0),
      }))

      handleTyping(newInput)
    },
    [gameStatus, currentTargetText.hiragana, userTypedText, handleTyping, setStats, setGameStatus],
  )

  // キーボードイベントの設定
  useEffect(() => {
    if (gameStatus !== 'gaming') return

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [gameStatus, handleKeyDown, setStats])

  // タイマー処理
  useEffect(() => {
    if (gameStatus !== 'gaming') return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const newTime = prev - 1
        if (newTime <= 0) {
          setGameStatus('end')
          return 0
        }
        return newTime
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [gameStatus, setGameStatus, setTimeLeft])

  // ゲーム状態のリセット
  const resetGame = useCallback(() => {
    setTimeLeft(timeLeftDefault)
    setCorrectTypedCount(0)
    setTypingSpeed(0)
    setDatasetIndex(0)
    setCurrentTargetText(shuffleDataset[0])
    setUserTypedText('')
    // 統計情報のリセット
    setStats({
      totalTyped: 0,
      correctTyped: 0,
      maxSpeed: 0,
      speedHistory: [],
    })
    isGaming.current = false
  }, [timeLeftDefault, shuffleDataset, setStats, setTypingSpeed])

  // ゲーム状態の監視
  useEffect(() => {
    if (gameStatus === 'gaming') {
      if (!isGaming.current) resetGame()
      isGaming.current = true
    } else if (gameStatus === 'end') {
      isGaming.current = false
    }
  }, [gameStatus, resetGame])

  return {
    timeLeft,
    typingSpeed,
    currentTargetText,
  }
}
