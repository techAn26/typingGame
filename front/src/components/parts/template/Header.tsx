import { css } from '@emotion/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKeyboard } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { useSetRecoilState } from 'recoil'
import { gameStateAtom } from '../../pages/home/state/gameStateAtom'
type Props = {
  className?: string
}

export const Header = ({ className }: Props) => {
  const setGameStatus = useSetRecoilState(gameStateAtom)
  return (
    <header css={[styles.container, className]}>
      <div css={styles.content}>
        <Link href='/' onClick={() => setGameStatus('start')}>
          <h3 css={styles.title}>
            <span css={styles.titleIcon}>
              <FontAwesomeIcon icon={faKeyboard} />
            </span>
            Typing Game
          </h3>
        </Link>
        <nav css={styles.nav}>
          <ul css={styles.menu}>
            <li css={styles.menuItem}>
              <Link href='/dataset'>
                <span css={styles.icon}>📚</span>
                問題一覧
                <span css={styles.badge}>12</span>
              </Link>
            </li>
            <li css={styles.menuItem}>
              <span css={styles.icon}>👤</span>
              ユーザ情報
            </li>
            <li css={styles.menuItem}>
              <button css={styles.startButton}>
                <span css={styles.icon}>🎮</span>
                ゲームを始める
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

const styles = {
  container: css`
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(8px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
  `,
  content: css`
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  title: css`
    font-size: 26px;
    font-weight: 800;
    color: #2c3e50;
    margin: 0;
    display: flex;
    align-items: center;
    gap: 12px;
    background: linear-gradient(135deg, #2c3e50 0%, #3498db 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    letter-spacing: 0.5px;

    &:hover {
      transform: scale(1.02);
      transition: transform 0.3s ease;
    }
  `,
  titleIcon: css`
    font-size: 32px;
  `,
  nav: css`
    height:;
  `,
  menu: css`
    height: 100%;
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 0;
    padding: 0;
  `,
  menuItem: css`
    position: relative;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 15px;
    font-weight: 500;
    color: #4a5568;
    cursor: pointer;
    padding: 8px 16px;
    border-radius: 12px;
    transition: all 0.2s ease;

    &:hover {
      background: #f8f9fa;
      color: #2c3e50;
      transform: translateY(-1px);
    }

    &:active {
      transform: translateY(0);
    }
  `,
  icon: css`
    font-size: 20px;
  `,
  badge: css`
    position: absolute;
    top: 0;
    right: 4px;
    background: #e53e3e;
    color: white;
    font-size: 12px;
    font-weight: bold;
    padding: 2px 6px;
    border-radius: 12px;
    transform: translateY(-50%);
  `,
  startButton: css`
    background: linear-gradient(135deg, #4caf50 0%, #45a049 100%);
    color: white;
    border: none;
    padding: 10px 20px;
    font-size: 15px;
    font-weight: 600;
    border-radius: 12px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: all 0.3s ease;
    box-shadow: 0 2px 8px rgba(76, 175, 80, 0.3);

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(76, 175, 80, 0.4);
      background: linear-gradient(135deg, #45a049 0%, #388e3c 100%);
    }

    &:active {
      transform: translateY(0);
      box-shadow: 0 2px 4px rgba(76, 175, 80, 0.2);
    }
  `,
}
