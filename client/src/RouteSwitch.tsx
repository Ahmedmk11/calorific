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
import ForgotPassword from './pages/ForgotPassword'
import Profile from './pages/Profile'
import MealLogs from './pages/MealLogs'
import HealthLogs from './pages/HealthLogs'
import MealLibrary from './pages/MealLibrary'
import FoodLibrary from './pages/FoodLibrary'
import Statistics from './pages/Statistics'
import AICoach from './pages/AICoach'

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
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path='*' element={<NotFound />} />

            <Route
                path='/home'
                element={
                    <UserGuard isAuthenticated={isAuthenticated}>
                        <Home />
                    </UserGuard>
                }
            />
            <Route
                path='/profile'
                element={
                    <UserGuard isAuthenticated={isAuthenticated}>
                        <Profile />
                    </UserGuard>
                }
            />
            <Route
                path='/meal-logs'
                element={
                    <UserGuard isAuthenticated={isAuthenticated}>
                        <MealLogs />
                    </UserGuard>
                }
            />
            <Route
                path='/health-logs'
                element={
                    <UserGuard isAuthenticated={isAuthenticated}>
                        <HealthLogs />
                    </UserGuard>
                }
            />
            <Route
                path='/meal-library'
                element={
                    <UserGuard isAuthenticated={isAuthenticated}>
                        <MealLibrary />
                    </UserGuard>
                }
            />
            <Route
                path='/food-library'
                element={
                    <UserGuard isAuthenticated={isAuthenticated}>
                        <FoodLibrary />
                    </UserGuard>
                }
            />
            <Route
                path='/stats'
                element={
                    <UserGuard isAuthenticated={isAuthenticated}>
                        <Statistics />
                    </UserGuard>
                }
            />
            <Route
                path='/coach'
                element={
                    <UserGuard isAuthenticated={isAuthenticated}>
                        <AICoach />
                    </UserGuard>
                }
            />
        </Routes>
    )
}

export default RouteSwitch
