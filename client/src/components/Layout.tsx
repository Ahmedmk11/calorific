import React, { ReactNode, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import axiosApi from '../utils/axiosApi'

import Header from './Header'

interface LayoutProps {
    children: ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [isHeader, setIsHeader] = useState<boolean | null>(null)
    const location = useLocation()

    useEffect(() => {
        axiosApi
            .get('/auth/get-curr-user')
            .then((res) => {
                if (res.data.userId) {
                    setIsHeader(true)
                } else {
                    setIsHeader(false)
                }
            })
            .catch((err) => {
                console.log(err)
                setIsHeader(false)
            })
    }, [location])

    return (
        <>
            {isHeader ? <Header /> : null}
            {children}
        </>
    )
}

export default Layout
