import { useState } from 'react'
import { TypingDatasetForm } from './TypingDatasetForm'
import { css } from '@emotion/react'
import { CustomSelectStr } from '../../../parts/select/CustomStrSelect'
import { useCreatePages } from './hook/useCreatePages'
import { TypingProblem } from './TypingDatasetForm'
export const Create = () => {
  const { difficulty, setDifficulty, options } = useCreatePages()
  const [displayText, setDisplayText] = useState('')
  const [hiragana, setHiragana] = useState('')
  const [problems, setProblems] = useState<TypingProblem[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!displayText.trim() || !hiragana.trim()) {
      alert('表示文とひらがなを入力してください')
      return
    }

    const newProblem: TypingProblem = {
      id: problems.length + 1, // 実際のAPIでは自動生成される想定
      displayText: displayText.trim(),
      hiragana: hiragana.trim(),
    }

    setProblems([...problems, newProblem])
    setDisplayText('')
    setHiragana('')
  }

  return (
    <div css={styles.container}>
      <CustomSelectStr label='難易度を選択' value={difficulty} setValue={setDifficulty} options={[...options]} />
      <form css={styles.form} onSubmit={handleSubmit}>
        <input
          type='text'
          value={displayText}
          onChange={(e) => setDisplayText(e.target.value)}
          css={styles.input}
          placeholder='表示文'
        />
        <input
          type='text'
          value={hiragana}
          onChange={(e) => setHiragana(e.target.value)}
          css={styles.input}
          placeholder='ひらがな'
        />
        <button type='submit' css={styles.button}>
          追加
        </button>
      </form>
      <TypingDatasetForm problems={problems} setProblems={setProblems} />
    </div>
  )
}

const styles = {
  container: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `,
  form: css`
    display: flex;
    gap: 10px;
    margin: 20px 0;
    width: 100%;
    max-width: 800px;
  `,
  input: css`
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
    flex: 1;
  `,
  button: css`
    padding: 8px 16px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
      background-color: #0056b3;
    }
  `,
}
