import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import { AuthProvider } from './contexts/AuthContext'

// Vite sets this based on the build --base (or '/' by default)
const rawBase = import.meta.env.BASE_URL ?? '/'
const basename = rawBase.endsWith('/') ? rawBase.slice(0, -1) : rawBase

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename={basename || '/'}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)
