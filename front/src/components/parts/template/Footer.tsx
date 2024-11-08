import { css } from '@emotion/react'

export const Footer = () => {
  return (
    <footer css={styles.container}>
      <div css={styles.copyright}>
        © 2024
        <a href='https://github.com/techAn26' target='_blank' rel='noopener noreferrer'>
          {' '}
          techAn26{' '}
        </a>
        &nbsp;All rights reserved.
      </div>
    </footer>
  )
}

const styles = {
  container: css`
    background: #2c3e50;
    padding: 24px 0;
    height: 69px;
    margin-top: auto;
  `,
  copyright: css`
    text-align: center;
    color: #cbd5e0;
    font-size: 14px;
    > a {
      color: #cbd5e0;
      font-weight: bold;
      text-decoration: none;
    }
  `,
}
