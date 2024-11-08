import { memo, ReactNode } from 'react'
import { css } from '@emotion/react'
import { Header } from './Header'
import { Footer } from './Footer'

type Props = {
  children: ReactNode
}

export const Template = memo<Props>(({ children }) => {
  return (
    <div css={styles.container}>
      <Header />
      <main css={styles.main}>{children}</main>
      <Footer />
    </div>
  )
})

const styles = {
  container: css`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  `,
  main: css`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 80px 0 0;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  `,
}
