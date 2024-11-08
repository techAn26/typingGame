import { css } from '@emotion/react'
import { DatasetType, useStartPages } from './hook/useStartPages'
import { CustomSelectStr } from '../../../../parts/select/CustomStrSelect'
import { CustomSelectObj } from '../../../../parts/select/CustomSelectObj'
import { gameStateAtom } from '../../state/gameStateAtom'
import { useSetRecoilState } from 'recoil'
import { CustomCard } from '../../../../parts/card/CustomCard'

export const Start = () => {
  const { level, setLevel, levelOptions, dataset, setDataset, datasetOptions } = useStartPages()
  const setGameStatus = useSetRecoilState(gameStateAtom)

  return (
    <div css={styles.container}>
      <CustomCard minHeight={500}>
        <h1 css={styles.title}>Let's Typing!</h1>
        <div css={styles.gameConfig}>
          <div css={styles.configItem}>
            <CustomSelectStr
              label={'難易度'}
              value={level}
              setValue={(value) => setLevel(value as 'easy' | 'normal' | 'hard')}
              options={[...levelOptions]}
            />
            <p css={styles.description}>タイピングの速度と難易度を選択してください</p>
          </div>
          <div css={styles.configItem}>
            <CustomSelectObj
              label={'データセット'}
              value={dataset}
              setValue={(value) => setDataset(value as DatasetType)}
              options={[...datasetOptions]}
            />
            <p css={styles.description}>練習したい単語セットを選択してください</p>
          </div>
        </div>
        <button css={styles.startButton} onClick={() => setGameStatus('gaming')}>
          スタート
        </button>
      </CustomCard>
    </div>
  )
}

const styles = {
  container: css`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 24px;
  `,
  content: css`
    width: 100%;
    width: 800px;
    text-align: center;
    background: rgba(255, 255, 255, 0.9);
    padding: 48px 64px;
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  `,
  title: css`
    font-size: 48px;
    margin-bottom: 48px;
    color: #2c3e50;
    font-weight: bold;
    letter-spacing: 2px;
  `,
  gameConfig: css`
    display: flex;
    gap: 48px;
    justify-content: center;
    margin-bottom: 40px;
  `,
  configItem: css`
    display: flex;
    flex-direction: column;
    gap: 8px;
  `,
  description: css`
    font-size: 14px;
    color: #666;
    margin: 0;
  `,
  startButton: css`
    background: #4caf50;
    color: white;
    border: none;
    padding: 16px 48px;
    font-size: 18px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 2px 8px rgba(76, 175, 80, 0.3);
    align-self: center;

    &:hover {
      background: #45a049;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(76, 175, 80, 0.4);
    }

    &:active {
      transform: translateY(0);
      box-shadow: 0 2px 4px rgba(76, 175, 80, 0.2);
    }
  `,
}
