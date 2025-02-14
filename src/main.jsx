import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@mui/material'
import { ScreenWidthProvider } from './contexts/ScreenWidthContext/ScreenWidthContext.jsx'
import { AuthProvider } from './contexts/AuthContext/AuthContext.jsx'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { esES } from "@mui/x-date-pickers/locales";
import theme from './theme.js';
import App from './App.jsx';
import './index.css'
import '@fontsource/roboto';
import "dayjs/locale/es";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <ScreenWidthProvider>
        <AuthProvider>
          <LocalizationProvider 
            dateAdapter={AdapterDayjs} 
            adapterLocale='es' 
          >
            <App />
          </LocalizationProvider>
        </AuthProvider>
      </ScreenWidthProvider>
    </ThemeProvider>
  </StrictMode>,
)
