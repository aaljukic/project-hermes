import React from 'react'
import ReactDOM from 'react-dom/client'
import ProjectHermesApp from './ProjectHermesApp.tsx'
import './index.scss'
import { BrowserRouter } from 'react-router-dom'
import LogContext from './context/LogContext.tsx'

ReactDOM.createRoot(document.getElementById('app')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <LogContext.Provider value="Hello from">
        <ProjectHermesApp />
      </LogContext.Provider>
    </BrowserRouter>
  </React.StrictMode>,
)
