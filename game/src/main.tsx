import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import ResorucesProvider from './providers/ResourcesProvider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ResorucesProvider>
      <App />
    </ResorucesProvider>
  </React.StrictMode>,
)
