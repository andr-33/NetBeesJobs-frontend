import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@mui/material'
import { ScreenWidthProvider } from './contexts/ScreenWidthContext/ScreenWidthContext.jsx'
import theme from './theme.js'
import './index.css'
import App from './App.jsx'
import '@fontsource/roboto';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <ScreenWidthProvider>
        <App />
      </ScreenWidthProvider>
    </ThemeProvider>
  </StrictMode>,
)
