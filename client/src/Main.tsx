import React, { ReactNode } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import RouteSwitch from './RouteSwitch'

import Layout from './components/Layout'

import './styles/index.scss'
import './styles/components.scss'
import './styles/pages.scss'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <Layout>
                <RouteSwitch />
            </Layout>
        </BrowserRouter>
    </React.StrictMode>
)
