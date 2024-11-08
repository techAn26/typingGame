import { css } from '@emotion/react'

export const Header = () => {
  return (
    <div css={styles.container}>
      <h3 css={styles.title}>typing</h3>
      <ul css={styles.menu}>
        <li>問題一覧</li>
        <li>ユーザ情報</li>
      </ul>
    </div>
  )
}

const styles = {
  container: css`
    display: flex;
    justify-content: space-between;
    padding: 0 40px;
    height: 80px;
    line-height: 80px;
    box-shadow: 2px 2px 2px #adadad;
  `,
  title: css``,
  menu: css`
    display: flex;
    justify-content: space-between;
    gap: 16px;
  `,
}
