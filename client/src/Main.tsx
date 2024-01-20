import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './pages/App.tsx'

import './styles/index.scss'
import './styles/components.scss'
import './styles/pages.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)
