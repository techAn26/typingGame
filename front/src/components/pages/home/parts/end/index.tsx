import { css } from '@emotion/react'
import { useSetRecoilState } from 'recoil'
import { gameStateAtom } from '../../state/gameStateAtom'
import { CustomCard } from '../../../../parts/card/CustomCard'
import { Typography, Button, Box } from '@mui/material'
import { motion } from 'framer-motion'
import { useRecoilValue } from 'recoil'
import { statsAtom } from '../../state/statsAtom'

export const End = () => {
  const setGameStatus = useSetRecoilState(gameStateAtom)
  const { totalTyped, correctTyped, maxSpeed, speedHistory } = useRecoilValue(statsAtom)
  const accuracy = (correctTyped / totalTyped) * 100
  const averageSpeed = speedHistory.reduce((a, b) => a + b, 0) / speedHistory.length

  const stats = [
    { label: '総タイプ数', value: `${totalTyped}回` },
    { label: '正確性', value: `${accuracy.toFixed(1)}%` },
    { label: '最高速度', value: `${maxSpeed.toFixed(1)}打/秒` },
    { label: '平均速度', value: `${averageSpeed.toFixed(1)}打/秒` },
  ]

  return (
    <CustomCard>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Typography variant='h4' css={styles.title}>
          タイピング結果
        </Typography>

        <Box css={styles.statsContainer}>
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              css={styles.statItem}
            >
              <Typography variant='h6' css={styles.statLabel}>
                {stat.label}
              </Typography>
              <Typography variant='h4' css={styles.statValue}>
                {stat.value}
              </Typography>
            </motion.div>
          ))}
        </Box>

        <Box css={styles.comment}>
          <Typography variant='h5' css={styles.commentText}>
            {getComment(accuracy, averageSpeed)}
          </Typography>
        </Box>

        <Box css={styles.buttonContainer}>
          <Button variant='contained' css={styles.retryButton} onClick={() => setGameStatus('gaming')}>
            もう一度挑戦する
          </Button>
          <Button variant='outlined' css={styles.newGameButton} onClick={() => setGameStatus('start')}>
            別の問題に挑戦する
          </Button>
        </Box>
      </motion.div>
    </CustomCard>
  )
}

const getComment = (accuracy: number, speed: number): string => {
  if (accuracy >= 95 && speed >= 5) return '素晴らしい成績です！🏆'
  if (accuracy >= 90 && speed >= 4) return 'とても良い結果ですね！👏'
  if (accuracy >= 85 && speed >= 3) return '着実な進歩が見られます！💪'
  return 'その調子で頑張りましょう！😊'
}

const styles = {
  title: css`
    color: #1a237e;
    margin-bottom: 2rem;
    font-weight: bold;
  `,
  statsContainer: css`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
    margin-bottom: 2rem;
  `,
  statItem: css`
    background: linear-gradient(145deg, #ffffff, #f0f0f0);
    padding: 1.5rem;
    border-radius: 16px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-5px);
    }
  `,
  statLabel: css`
    color: #666;
    margin-bottom: 0.5rem;
    font-weight: 500;
  `,
  statValue: css`
    color: #1a237e;
    font-weight: bold;
  `,
  comment: css`
    margin: 2rem 0;
    padding: 1.5rem;
    background: linear-gradient(145deg, #e3f2fd, #bbdefb);
    border-radius: 12px;
  `,
  commentText: css`
    color: #1a237e;
    font-weight: 500;
  `,
  buttonContainer: css`
    margin-top: 2rem;
    display: flex;
    gap: 1rem;
    justify-content: center;
  `,
  retryButton: css`
    background: linear-gradient(45deg, #1a237e, #3949ab);
    padding: 1rem 2rem;
    font-size: 1.1rem;
    font-weight: bold;
    border-radius: 8px;
    text-transform: none;
    transition: all 0.3s ease;

    &:hover {
      background: linear-gradient(45deg, #3949ab, #1a237e);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(26, 35, 126, 0.3);
    }
  `,
  newGameButton: css`
    padding: 1rem 2rem;
    font-size: 1.1rem;
    font-weight: bold;
    border-radius: 8px;
    text-transform: none;
    color: #1a237e;
    border-color: #1a237e;
    transition: all 0.3s ease;

    &:hover {
      background: rgba(26, 35, 126, 0.04);
      transform: translateY(-2px);
      border-color: #1a237e;
    }
  `,
}
