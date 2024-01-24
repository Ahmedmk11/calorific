import React, { useState } from 'react'

import { useSelector } from 'react-redux'

import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Button from '@mui/material/Button'
import Badge from '@mui/material/Badge'

const Header: React.FC = () => {
    const currentUser = useSelector((state: any) => state.user.currentUser)
    const [numberNotifications, setNumberNotifications] = useState(9)

    const handleBadgeCount = (count: number) => {
        setNumberNotifications(count)
    }

    return (
        <div id='header-component'>
            <div id='header-upper'>
                <h1>Calorific</h1>
                <div id='header-upper-actions-buttons'>
                    <Badge
                        color='secondary'
                        badgeContent={numberNotifications}
                        invisible={numberNotifications == 0}>
                        <NotificationsNoneIcon fontSize='large' />
                    </Badge>
                    <AccountCircleIcon
                        fontSize='large'
                        style={{
                            cursor: 'pointer',
                        }}
                    />
                </div>
            </div>
            <div id='header-lower'>
                <h2 id='header-lower-left'>Hi, {currentUser.name}</h2>
                <div id='header-lower-right'>
                    <Button href='/meal-logs' sx={{ color: 'white' }}>
                        Meal Logs
                    </Button>
                    <Button href='/health-logs' sx={{ color: 'white' }}>
                        Health Logs
                    </Button>
                    <Button href='/meal-library' sx={{ color: 'white' }}>
                        Meal Library
                    </Button>
                    <Button href='/food-library' sx={{ color: 'white' }}>
                        Food Library
                    </Button>
                    <Button href='/stats' sx={{ color: 'white' }}>
                        Statistics
                    </Button>
                    <Button href='/coach' sx={{ color: 'white' }}>
                        AI Coach (Coming Soon)
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Header
