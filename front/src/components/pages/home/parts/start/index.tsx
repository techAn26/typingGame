import { css } from '@emotion/react'
// import {useStartPages} from "./hook/useStartPages";
// import {CustomSelectStr} from "../../../../parts/select/CustomStrSelect";

export const Start = () => {
  // const {level, setLevel, levelOptions, dataset, setDataset, datasetOptions} = useStartPages()

  return (
    <div css={styles.container}>
      <h1>Let's Typing!</h1>
      <div css={styles.gameConfig}>
        {/*<CustomSelectStr label={'難易度'} value={level} setValue={setLevel} options={[...levelOptions]} />*/}
        {/*<CustomSelectObj label={'データセット'} value={dataset} setValue={setDataset} options={[...datasetOptions]} />*/}
      </div>
    </div>
  )
}

const styles = {
  container: css`
    height: 100vh;
  `,
  gameConfig: css`
    display: flex;
    gap: 32px;
  `,
}
