import { useEffect, useRef, useState } from 'react'
import { GameStatus } from '../../../state/gameStateAtom'

type UseTimerProps = {
  timeLeftDefault: number
  correctTypedCount: number
  gameStatus: GameStatus
  handleKeyDown: (e: KeyboardEvent) => void
  onTimeUp: () => void
}

export const useTimer = ({
  timeLeftDefault,
  correctTypedCount,
  gameStatus,
  handleKeyDown,
  onTimeUp,
}: UseTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(timeLeftDefault)
  const [typingSpeed, setTypingSpeed] = useState(0)
  const interval = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (gameStatus === 'gaming') {
      window.addEventListener('keydown', handleKeyDown)

      interval.current = setInterval(() => {
        setTimeLeft((prev) => {
          const newTimeLeft = prev - 1
          if (newTimeLeft <= 0) {
            if (interval.current) clearInterval(interval.current)
            window.removeEventListener('keydown', handleKeyDown)
            onTimeUp()
            return 0
          }
          return newTimeLeft
        })
      }, 1000)
    }

    return () => {
      if (interval.current) clearInterval(interval.current)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [gameStatus, handleKeyDown, onTimeUp, setTypingSpeed, timeLeftDefault, timeLeft])

  useEffect(() => {
    const typingTime = timeLeftDefault - timeLeft
    setTypingSpeed(typingTime <= 0 ? 0 : Number((correctTypedCount / typingTime).toFixed(2)))
  }, [correctTypedCount, timeLeft, timeLeftDefault, setTypingSpeed])

  return { timeLeft, typingSpeed }
}
