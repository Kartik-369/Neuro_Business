import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {StyledEngineProvider} from '@mui/material/styles'
import './index.css'
import App from './App.jsx'
// import { StyledEngineProvider } from '@mui/material'

createRoot(document.getElementById('root')).render(
  <StyledEngineProvider>
  <StrictMode>
    <App />
  </StrictMode>
<<<<<<< HEAD
</StyledEngineProvider>
=======
</StyledEngineProvider>,
>>>>>>> 40ed743 (Improved Navbar: Added MUI components)
)
