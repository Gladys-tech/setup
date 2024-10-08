import { useState, Fragment, ChangeEvent, ReactNode } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import IconButton from '@mui/material/IconButton'
import { Visibility, VisibilityOff } from '@mui/icons-material'

import { styled, useTheme } from '@mui/material/styles'
import MuiCard, { CardProps } from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'
import MuiFormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel'

// ** Demo Imports
import { useRouter } from 'next/router'
import { API_BASE_URL } from 'src/pages/api/http.api'
import { Grid } from '@mui/material'
import AuthLayout from 'src/layouts/AuthLayout'

interface Address {
    street: string;
    city: string;
    country: string;
    telephone: number;
}

interface State {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    isEmailVerified: boolean;
    agreeToTerms: boolean;
    address: Address;
}

// ** Styled Components
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
    width: '100%',
    maxWidth: '400px',
    margin: '0 auto',
    padding: theme.spacing(5),
    borderRadius: theme.shape.borderRadius * 2,
    boxShadow: theme.shadows[3],
    backgroundColor: theme.palette.background.paper
}))

const LinkStyled = styled('a')(({ theme }) => ({
    fontSize: '0.875rem',
    textDecoration: 'none',
    color: theme.palette.primary.main
}))

const FormControlLabel = styled(MuiFormControlLabel)<FormControlLabelProps>(({ theme }) => ({
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(4),
    '& .MuiFormControlLabel-label': {
        fontSize: '0.875rem',
        color: theme.palette.text.secondary
    }
}))

const RegisterPage = () => {
    const [signupDetails, setSignupDetails] = useState<State>({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        isEmailVerified: false,
        agreeToTerms: false,
        address: {
            street: '',
            city: '',
            country: '',
            telephone: 0
        }
    })

    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState('')
    const [successMessage, setSuccessMessage] = useState('')

    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword)
    }

    const handleChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
        if (prop === 'agreeToTerms') {
            setSignupDetails({ ...signupDetails, [prop]: event.target.checked })
        } else {
            setSignupDetails({ ...signupDetails, [prop]: event.target.value })
        }
    }

    const handleAddressChange = (prop: keyof Address) => (event: ChangeEvent<HTMLInputElement>) => {
        setSignupDetails({
            ...signupDetails,
            address: { ...signupDetails.address, [prop]: event.target.value }
        })
    }

    const theme = useTheme()
    const router = useRouter()

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault()
        try {
            console.log('signing up with:', signupDetails)
            const response = await fetch(`${API_BASE_URL}/signup-professional`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signupDetails)
            })

            if (!response.ok) {
                const errorText = await response.text()
                console.error('Response error text:', errorText)
                throw new Error('Registration failed')
            }

            const contentType = response.headers.get('Content-Type')
            if (contentType && contentType.includes('application/json')) {
                const data = await response.json()
                console.log('registered successfully:', data)
                setSuccessMessage('Registration successful! Redirecting to login page...')
                router.push('/pages/login')
            } else {
                const errorText = await response.text()
                console.error('Unexpected content type:', contentType, 'Response text:', errorText)
                throw new Error('Unexpected response format')
            }
        } catch (error) {
            setError('An error occurred. Please try again later.')
            console.error('Registration failed:', error instanceof Error ? error.message : 'Unknown error')
        }
    }

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: theme.palette.background.default
            }}
        >
            <Card>
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <img src='/images/logo.png' alt='LOGO' width={80} />
                    {/* <Typography variant='h6' sx={{ mt: 2, color: '#6c757d' }}>
            LOGO
          </Typography> */}
                </Box>
                <Typography variant='h5' sx={{ mb: 3, textAlign: 'center', fontWeight: 600 }}>
                    Create an Account
                </Typography>
                <form noValidate autoComplete='off' onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label='First Name'
                                name='firstName'
                                value={signupDetails.firstName}
                                onChange={handleChange('firstName')}
                                sx={{ marginBottom: 3, height: '56px' }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label='Last Name'
                                name='lastName'
                                value={signupDetails.lastName}
                                onChange={handleChange('lastName')}
                                sx={{ marginBottom: 3, height: '56px' }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label='Email'
                                name='email'
                                value={signupDetails.email}
                                onChange={handleChange('email')}
                                sx={{ marginBottom: 3, height: '56px' }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                type={showPassword ? 'text' : 'password'}
                                label='Password'
                                name='password'
                                value={signupDetails.password}
                                onChange={handleChange('password')}
                                sx={{ marginBottom: 3, height: '56px' }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position='end'>
                                            <IconButton onClick={togglePasswordVisibility} edge='end'>
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label='Street'
                                name='street'
                                value={signupDetails.address.street}
                                onChange={handleAddressChange('street')}
                                sx={{ marginBottom: 3, height: '56px' }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label='City'
                                name='city'
                                value={signupDetails.address.city}
                                onChange={handleAddressChange('city')}
                                sx={{ marginBottom: 3, height: '56px' }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label='Country'
                                name='country'
                                value={signupDetails.address.country}
                                onChange={handleAddressChange('country')}
                                sx={{ marginBottom: 3, height: '56px' }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label='Telephone'
                                name='telephone'
                                value={signupDetails.address.telephone}
                                onChange={handleAddressChange('telephone')}
                                sx={{ marginBottom: 3, height: '56px' }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox />}
                                label={
                                    <Fragment>
                                        <span>I agree to </span>
                                        <Link href='/pages/terms_and_conditions' passHref>
                                            <LinkStyled>privacy policy & terms</LinkStyled>
                                        </Link>
                                    </Fragment>
                                }
                            />
                        </Grid>
                        {error && (
                            <Grid item xs={12}>
                                <Typography color='error' variant='body2'>
                                    {error}
                                </Typography>
                            </Grid>
                        )}
                        {successMessage && (
                            <Grid item xs={12}>
                                <Typography color='success' variant='body2'>
                                    {successMessage}
                                </Typography>
                            </Grid>
                        )}
                        <Grid item xs={12}>
                            <Button
                                fullWidth
                                type='submit'
                                variant='contained'
                                sx={{
                                    backgroundColor: theme.palette.primary.main,
                                    color: theme.palette.primary.contrastText,
                                    textTransform: 'none',
                                    '&:hover': {
                                        backgroundColor: theme.palette.secondary.main
                                    },
                                    height: '56px', // Matching height with input fields
                                    borderRadius: '8px', // Adding the border radius similar to the style in the image
                                    marginTop: '20px',
                                    fontSize: '1rem',
                                }}
                            >
                                Sign Up
                            </Button>
                        </Grid>
                    </Grid>
                </form>
                <Divider sx={{ my: 3 }} />
                <Box sx={{ textAlign: 'center' }}>
                    <Typography variant='body2' sx={{ mb: 2 }}>
                        Already have an account?{' '}
                        <Link href='/login' passHref>
                            <LinkStyled>Sign in</LinkStyled>
                        </Link>
                    </Typography>
                </Box>
            </Card>
        </Box>
    )
}

RegisterPage.getLayout = (page: ReactNode) => <AuthLayout>{page}</AuthLayout>
RegisterPage.guestGuard = true

export default RegisterPage

