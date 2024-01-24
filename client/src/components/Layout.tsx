import React, { ReactNode, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import Header from './Header'
import { useSelector } from 'react-redux'

interface LayoutProps {
    children: ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [isHeader, setIsHeader] = useState<boolean | null>(null)
    const location = useLocation()
    const currentUser = useSelector((state: any) => state.user.currentUser)

    useEffect(() => {
        if (currentUser?._id) {
            setIsHeader(true)
        } else {
            setIsHeader(false)
        }
    }, [location, currentUser])

    return (
        <>
            {isHeader ? <Header /> : null}
            {children}
        </>
    )
}

export default Layout
