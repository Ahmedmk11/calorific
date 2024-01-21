import * as React from 'react'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import axiosApi from '../utils/axiosApi'

function Register() {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)

        try {
            axiosApi.post('/user/register-user', {
                username: data.get('username'),
                name: data.get('name'),
                email: data.get('email'),
                password: data.get('password'),
                birthdate: data.get('birthdate'),
                sex: data.get('sex'),
                phoneNumber: data.get('phoneNumber'),
            })
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
                    Register
                </Typography>
                <Box
                    component='form'
                    noValidate
                    onSubmit={handleSubmit}
                    sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete='username'
                                name='username'
                                required
                                fullWidth
                                id='username'
                                label='Username'
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete='name'
                                name='name'
                                required
                                fullWidth
                                id='name'
                                label='Name'
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id='email'
                                label='Email Address'
                                name='email'
                                autoComplete='email'
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name='password'
                                label='Password'
                                type='password'
                                id='password'
                                autoComplete='new-password'
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                name='birthdate'
                                label='Birthdate'
                                type='date'
                                id='birthdate'
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel id='sex-label'>Sex *</InputLabel>
                                <Select
                                    required
                                    labelId='sex-label'
                                    id='sex'
                                    name='sex'
                                    label='Sex'>
                                    <MenuItem value='male'>Male</MenuItem>
                                    <MenuItem value='female'>Female</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name='phoneNumber'
                                label='Phone Number'
                                id='phoneNumber'
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        sx={{ mt: 3, mb: 2 }}>
                        Sign Up
                    </Button>
                    <Grid container justifyContent='flex-end'>
                        <Grid item>
                            <Link href='#' variant='body2'>
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    )
}

export default Register
