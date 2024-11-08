import { css } from '@emotion/react'
import { GameStatus, useHomePages } from './hook/useHomePages'
import { Start } from './parts/start'
import { Gaming } from './parts/game'
import { End } from './parts/end'

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
      return <Gaming />
    case 'end':
      return <End />
  }
}

const styles = {
  container: css``,
}
