import React from 'react'
import { Typography, Box } from '@mui/material'

const NotFound: React.FC = () => {
    return (
        <div id='notfound-page'>
            <Typography variant='h1'>404 - Page Not Found</Typography>
            <Typography variant='body1'>
                The page you are looking for does not exist.
            </Typography>
        </div>
    )
}

export default NotFound
