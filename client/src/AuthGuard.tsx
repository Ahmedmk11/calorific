import React from 'react'
import { Navigate } from 'react-router-dom'

const LoginGuard = ({
    isAuthenticated,
    children,
}: {
    isAuthenticated: boolean | null
    children: React.ReactNode
}) => {
    if (!isAuthenticated) {
        return children
    } else {
        return <Navigate to='/home' />
    }
}

const UserGuard = ({
    isAuthenticated,
    children,
}: {
    isAuthenticated: boolean | null
    children: React.ReactNode
}) => {
    if (isAuthenticated != null) {
        if (isAuthenticated) {
            return children
        } else if (!isAuthenticated) {
            return <Navigate to='/login' />
        }
    }
}

export { LoginGuard, UserGuard }
