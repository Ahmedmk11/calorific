import React, { useState } from 'react'

import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Button from '@mui/material/Button'
import Badge from '@mui/material/Badge'

const Header: React.FC = () => {
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
                    <AccountCircleIcon fontSize='large' />
                </div>
            </div>
            <div id='header-lower'>
                <h2 id='header-lower-left'>Hi, Ahmed Mahmoud</h2>
                <div id='header-lower-right'>
                    <Button href='#' sx={{ color: 'white' }}>
                        Meal Logs
                    </Button>
                    <Button href='#' sx={{ color: 'white' }}>
                        Health Logs
                    </Button>
                    <Button href='#' sx={{ color: 'white' }}>
                        Food Library
                    </Button>
                    <Button href='#' sx={{ color: 'white' }}>
                        Meal Library
                    </Button>
                    <Button href='#' sx={{ color: 'white' }}>
                        Statistics
                    </Button>
                    <Button href='#' sx={{ color: 'white' }}>
                        AI Coach (Coming Soon)
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Header
