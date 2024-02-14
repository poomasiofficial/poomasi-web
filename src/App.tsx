import { Toast } from '@components'
import { ThemeProvider } from '@mui/material'
import { Router } from '@routes'
import { GlobalStyle, globalTheme } from '@styles'
import { RecoilRoot } from 'recoil'
import ReactGA from 'react-ga4'
import { useEffect } from 'react'

function App() {
  useEffect(() => {
    // GA init
    if (process.env.REACT_APP_GA_MEASUREMENT_ID) {
      ReactGA.initialize(process.env.REACT_APP_GA_MEASUREMENT_ID)
    }
  }, [])

  return (
    <RecoilRoot>
      <ThemeProvider theme={globalTheme}>
        <GlobalStyle />
        <Router />
        <Toast />
      </ThemeProvider>
    </RecoilRoot>
  )
}

export default App
