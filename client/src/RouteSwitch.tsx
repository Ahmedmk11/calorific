import { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'

import { LoginGuard, UserGuard } from './AuthGuard'
import axiosApi from './utils/axiosApi'

import Home from './pages/Home'
// import Login from './pages/Login'
import Register from './pages/Register'

const RouteSwitch = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
    const location = useLocation()

    useEffect(() => {
        axiosApi
            .get('/auth/get-curr-user')
            .then((res) => {
                if (res.data._id) {
                    setIsAuthenticated(true)
                } else {
                    setIsAuthenticated(false)
                }
            })
            .catch((err) => {
                console.log(err)
                setIsAuthenticated(false)
            })
    }, [location])

    return (
        <Routes>
            {/* <Route
                path='/'
                element={
                    <LoginGuard isAuthenticated={isAuthenticated}>
                        <Login />
                    </LoginGuard>
                }
            />
            <Route
                path='/login'
                element={
                    <LoginGuard isAuthenticated={isAuthenticated}>
                        <Login />
                    </LoginGuard>
                }
            /> */}
            <Route path='/register' element={<Register />} />
            {/* <Route path='/forgot-password' element={<ForgotPassword />} /> */}
            {/* <Route path='*' element={<NotFound />} /> */}

            <Route
                path='/home'
                element={
                    <UserGuard isAuthenticated={isAuthenticated}>
                        <Home />
                    </UserGuard>
                }
            />
        </Routes>
    )
}

export default RouteSwitch
