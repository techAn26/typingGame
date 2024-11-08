import { css } from '@emotion/react'
import { Box } from '@mui/material'
import { SerializedStyles } from '@emotion/react'

type Props = {
  children: React.ReactNode
  width?: number
  minHeight?: number
  css?: SerializedStyles
}

export const CustomCard = ({ children, width = 800, minHeight = 300, css }: Props) => {
  return <Box css={[styles.container, { width, minHeight }, css]}>{children}</Box>
}

const styles = {
  container: css`
    width: 100%;
    text-align: center;
    background: rgba(255, 255, 255, 0.9);
    padding: 48px 64px;
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    justify-content: center;
  `,
}
