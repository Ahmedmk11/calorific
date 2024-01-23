import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import RouteSwitch from './RouteSwitch'
import Layout from './components/Layout'
import store from './reduxStore'

import { createTheme, ThemeProvider } from '@mui/material/styles'

import './styles/index.scss'
import './styles/components.scss'
import './styles/pages.scss'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

const customTheme = createTheme({
    palette: {
        primary: {
            main: '#701FFF',
        },
    },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <Layout>
                    <ThemeProvider theme={customTheme}>
                        <RouteSwitch />
                    </ThemeProvider>
                </Layout>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
)
