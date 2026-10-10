import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/inter'
import '@fontsource-variable/space-grotesk'
import '@/styles/globals.css'
import { AppProviders } from '@/app/providers/AppProviders'
import { App } from '@/app/App'

const root = document.getElementById('root')
if (!root) throw new Error('Root element #root was not found.')

createRoot(root).render(
  <StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </StrictMode>,
)
