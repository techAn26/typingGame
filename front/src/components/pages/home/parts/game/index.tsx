import { css } from '@emotion/react'
import { Box, Typography } from '@mui/material'
import { useTypingGamePages } from './hook/useTypingGamePages'
import { useRecoilState } from 'recoil'
import { gameStateAtom } from '../../state/gameStateAtom'

type Props = {
  timeLeftDefault?: number
}

export const TypingGame = ({ timeLeftDefault = 60 }: Props) => {
  const [gameStatus, setGameStatus] = useRecoilState(gameStateAtom)
  const { timeLeft, typingSpeed, currentTargetText } = useTypingGamePages({
    gameStatus,
    setGameStatus,
    timeLeftDefault,
  })

  return (
    <Box css={styles.container}>
      <Box css={styles.gameWrapper}>
        <Box css={styles.timerSection}>
          <Typography variant='h5' css={styles.timerLabel}>
            残り時間
          </Typography>
          <Typography variant='h4' css={styles.timerValue(timeLeft)}>
            {String(timeLeft).padStart(3, '0')}
          </Typography>
          <Box css={styles.progressBar}>
            <Box css={styles.progressLeft} style={{ width: `${(timeLeft / timeLeftDefault) * 50}%` }} />
            <Box css={styles.progressRight} style={{ width: `${(timeLeft / timeLeftDefault) * 50}%` }} />
          </Box>
        </Box>

        <Box css={styles.gameContent}>
          <Typography variant='h2' css={styles.questionText}>
            {currentTargetText.question}
          </Typography>
          <Typography variant='h6' css={styles.romajiText}>
            {currentTargetText.hiragana}
          </Typography>
        </Box>

        <Box css={styles.statsSection}>
          <Box css={styles.speedDisplay}>
            <Typography variant='body2' css={styles.speedLabel}>
              タイピング速度
            </Typography>
            <Typography variant='h4' css={styles.speedValue}>
              {typingSpeed.toFixed(1)}
              <span css={styles.speedUnit}>打/秒</span>
            </Typography>
          </Box>
          <Box css={styles.speedGraph}>
            {[...Array(8)].map((_, i) => (
              <Box key={i} css={[styles.speedBar, i < Math.floor(typingSpeed) && styles.activeSpeedBar]} />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

const styles = {
  container: css`
    max-width: 900px;
    margin: 0 auto;
    padding: 2rem;
    width: 100vw;
  `,
  gameWrapper: css`
    background: #ffffff;
    border-radius: 24px;
    padding: 3rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
    gap: 3rem;
  `,
  timerSection: css`
    text-align: center;
  `,
  timerLabel: css`
    color: #666;
    margin-bottom: 0.5rem;
    font-weight: 500;
  `,
  timerValue: (timeLeft: number) => css`
    font-weight: 700;
    color: ${timeLeft < 10 ? '#ff6347' : '#1a237e'};
    margin-bottom: 1rem;
  `,
  progressBar: css`
    height: 6px;
    background: #f0f0f0;
    border-radius: 3px;
    overflow: hidden;
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
  `,
  progressLeft: css`
    height: 100%;
    background: linear-gradient(90deg, #1a237e, #3949ab);
    border-radius: 3px 0 0 3px;
    transition: width 0.3s ease;
  `,
  progressRight: css`
    height: 100%;
    background: linear-gradient(90deg, #3949ab, #1a237e);
    border-radius: 0 3px 3px 0;
    transition: width 0.3s ease;
  `,
  gameContent: css`
    text-align: center;
    min-height: 160px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1.5rem;
  `,
  questionText: css`
    color: #1a237e;
    font-weight: 700;
    font-size: 3rem;
    letter-spacing: 0.05em;
  `,
  romajiText: css`
    color: #666;
    font-weight: 500;
  `,
  statsSection: css`
    display: flex;
    align-items: center;
    gap: 2rem;
    padding: 1rem 2rem;
    background: #f8f9fa;
    border-radius: 12px;
  `,
  speedDisplay: css`
    min-width: 150px;
  `,
  speedLabel: css`
    color: #666;
    margin-bottom: 0.25rem;
  `,
  speedValue: css`
    color: #1a237e;
    font-weight: 700;
  `,
  speedUnit: css`
    font-size: 0.9rem;
    margin-left: 0.5rem;
    color: #666;
  `,
  speedGraph: css`
    flex-grow: 1;
    display: flex;
    gap: 4px;
    align-items: center;
    height: 40px;
  `,
  speedBar: css`
    flex: 1;
    height: 24px;
    background: #f0f0f0;
    border-radius: 4px;
    transition: all 0.3s ease;
  `,
  activeSpeedBar: css`
    background: linear-gradient(180deg, #1a237e, #3949ab);
  `,
}
