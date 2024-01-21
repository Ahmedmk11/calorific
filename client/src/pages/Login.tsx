import * as React from 'react'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import axiosApi from '../utils/axiosApi'
import { useNavigate } from 'react-router-dom'

function Login() {
    const navigate = useNavigate()

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)

        try {
            await axiosApi.post('/auth/login', {
                emailOrUsername: data.get('emailOrUsername'),
                password: data.get('password'),
                remember: data.get('remember'),
            })

            console.log('logged in')
            navigate('/home')
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Container component='main' maxWidth='xs'>
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                <Typography
                    component='h1'
                    variant='h5'
                    style={{
                        color: '#585858',
                    }}>
                    Sign in
                </Typography>
                <Box
                    component='form'
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ mt: 1 }}>
                    <TextField
                        margin='normal'
                        required
                        fullWidth
                        id='emailOrUsername'
                        label='Email Address or Username'
                        name='emailOrUsername'
                        autoComplete='email'
                        autoFocus
                        InputLabelProps={{
                            required: false,
                        }}
                    />
                    <TextField
                        margin='normal'
                        required
                        fullWidth
                        name='password'
                        label='Password'
                        type='password'
                        id='password'
                        autoComplete='current-password'
                        InputLabelProps={{
                            required: false,
                        }}
                    />
                    <FormControlLabel
                        id='remember'
                        name='remember'
                        style={{
                            color: '#585858',
                        }}
                        control={<Checkbox value={true} color='primary' />}
                        label='Remember me'
                    />
                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        sx={{ mt: 3, mb: 2 }}>
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href='#' variant='body2'>
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href='#' variant='body2'>
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    )
}

export default Login
