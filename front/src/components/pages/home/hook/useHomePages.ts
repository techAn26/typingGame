import { useState } from 'react'

export type GameStatus = 'start' | 'gaming' | 'end'

export const useHomePages = () => {
  const [gameStatus, setGameStatus] = useState<GameStatus>('start')

  return {
    gameStatus,
    setGameStatus,
  }
}
