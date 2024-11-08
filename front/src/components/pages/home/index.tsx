import { css } from '@emotion/react'
import { useHomePages } from './hook/useHomePages'
import { Start } from './parts/start'
import { TypingGame } from './parts/game'
import { End } from './parts/end'
import { GameStatus } from './state/gameStateAtom'

export const Home = () => {
  const { gameStatus } = useHomePages()
  return (
    <div css={styles.container}>
      <MainComponents status={gameStatus} />
    </div>
  )
}

const MainComponents = ({ status }: { status: GameStatus }) => {
  switch (status) {
    case 'start':
      return <Start />
    case 'gaming':
      return <TypingGame timeLeftDefault={10} />
    case 'end':
      return <End />
  }
}

const styles = {
  container: css``,
}
