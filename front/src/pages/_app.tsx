import type { AppProps } from 'next/app'
import { Template } from '../components/parts/template/Template'
import { css, Global } from '@emotion/react'
import { useEffect, useState } from 'react'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import normalize from 'normalize.css'

const globalStyle = css`
  ${normalize}
  a {
    text-decoration: none;
    color: inherit;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
  }

  body {
    line-height: 1.5;
    color: #212529;
  }

  button {
    &:not(:disabled) {
      cursor: pointer;
    }
  }

  ul {
    li {
      list-style: none;
    }
  }

  ol {
    padding-inline-start: 40px;
  }

  table {
    border-collapse: collapse;
  }
`

export default function App({ Component, pageProps }: AppProps) {
  // hydration mismatch error回避
  // https://react.dev/reference/react-dom/client/hydrateRoot#handling-different-client-and-server-content
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => {
    setIsMounted(true)
  }, [setIsMounted])

  return (
    <div>
      <Global styles={globalStyle} />
      {isMounted && (
        <Template>
          <Component {...pageProps} />
        </Template>
      )}
    </div>
  )
}
