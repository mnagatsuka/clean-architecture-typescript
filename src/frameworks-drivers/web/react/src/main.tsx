import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import { ConfigContext } from './contexts/ConfigContext'

const client = new QueryClient()
const apiUrl = import.meta.env.VITE_API_URL as string

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error("Root element not found")

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ConfigContext.Provider value={{ apiUrl }}>
      <QueryClientProvider client={client}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </ConfigContext.Provider>
  </React.StrictMode>
)
