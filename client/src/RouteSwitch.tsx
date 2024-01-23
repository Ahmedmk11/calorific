import { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'

import { LoginGuard, UserGuard } from './AuthGuard'
import axiosApi from './utils/axiosApi'

import { useDispatch } from 'react-redux'
import { setCurrentUser } from './actions/userActions'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import NotFound from './pages/NotFound'

const RouteSwitch = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
    const location = useLocation()
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axiosApi.get('/auth/get-curr-user')
                if (res.data._id) {
                    setIsAuthenticated(true)
                    dispatch(setCurrentUser(res.data))
                } else {
                    setIsAuthenticated(false)
                }
            } catch (error) {
                console.log(error)
                setIsAuthenticated(false)
            }
        }
        fetchUser()
    }, [dispatch, location])

    return (
        <Routes>
            <Route
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
            />
            <Route path='/register' element={<Register />} />
            {/* <Route path='/forgot-password' element={<ForgotPassword />} /> */}
            <Route path='*' element={<NotFound />} />

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
