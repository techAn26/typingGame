import { memo, ReactNode } from 'react'
import { css } from '@emotion/react'
import { Header } from './Header'

type Props = {
  children: ReactNode
}

export const Template = memo<Props>(({ children }) => {
  return (
    <div css={styles.container}>
      <Header />
      {children}
    </div>
  )
})

const styles = {
  container: css``,
}
