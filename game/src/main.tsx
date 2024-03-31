import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import ResourcesProvider from './providers/ResourcesProvider.tsx'
import BuildingsProvider from './providers/BuildingsProvider.tsx'
import SoldiersProvider from './providers/SoldiersProvider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BuildingsProvider>
      <ResourcesProvider>
        <SoldiersProvider>
          <App />
        </SoldiersProvider>
      </ResourcesProvider>
    </BuildingsProvider>
  </React.StrictMode>,
)
