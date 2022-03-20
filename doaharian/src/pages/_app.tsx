import type { AppProps } from 'next/app'

import '@styles/globals.css'
import AppProvider from '@contexts/AppContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  )
}

export default MyApp
