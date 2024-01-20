import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import RouteSwitch from './RouteSwitch'

import './styles/index.scss'
import './styles/components.scss'
import './styles/pages.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <RouteSwitch />
        </BrowserRouter>
    </React.StrictMode>
)
