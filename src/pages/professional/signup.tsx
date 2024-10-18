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

import { useRouter } from 'next/router'
import { API_BASE_URL } from 'src/pages/api/http.api'
import { Grid } from '@mui/material'
import AuthLayout from 'src/layouts/AuthLayout'

interface Address {
    // street: string;
    city: string;
    country: string;
    telephone: string; 
}

interface State {
    firstName: string;
    lastName: string;
    companyName: string;
    email: string;
    password: string;
    isEmailVerified: boolean;
    agreeToTerms: boolean;
    address: Address;
}

// ** Styled Components
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
    width: '100%',
    maxWidth: '100%',
    margin: '0 auto',
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius * 2,
    boxShadow: theme.shadows[3],
    backgroundColor: theme.palette.background.paper,
    // Added responsive styles
    '@media (max-width: 480px)': {
        padding: theme.spacing(1),
    }
}))

const LinkStyled = styled('a')(({ theme }) => ({
    fontSize: '0.875rem',
    textDecoration: 'none',
    color: theme.palette.primary.main
}))

const FormControlLabel = styled(MuiFormControlLabel)<FormControlLabelProps>(({ theme }) => ({
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(1),
    '& .MuiFormControlLabel-label': {
        fontSize: '0.875rem',
        color: theme.palette.text.secondary
    }
}))

const RegisterPage = () => {
    const [signupDetails, setSignupDetails] = useState<State>({
        firstName: '',
        lastName: '',
        companyName: '',
        email: '',
        password: '',
        isEmailVerified: false,
        agreeToTerms: false,
        address: {
            // street: '',
            city: '',
            country: '',
            telephone: ''
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
            const response = await fetch(`${API_BASE_URL}/signup/professional`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signupDetails)
            })

            if (!response.ok) {
                const errorText = await response.text()
                throw new Error(errorText || 'Registration failed')
            }

            const contentType = response.headers.get('Content-Type')
            if (contentType?.includes('application/json')) {
                const data = await response.json()
                setSuccessMessage('Registration successful! Redirecting to login page...')
                router.push('/professional/login')
            } else {
                const errorText = await response.text()
                throw new Error(errorText || 'Unexpected response format')
            }
        } catch (error) {
            setError('An error occurred. Please try again later.')
        }
    }

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: theme.palette.background.default
            }}
        >
            {/* Centered Logo */}
            <Box sx={{ textAlign: 'center', mb: 3 }}>
                <img src='/images/LOGO.png' alt='LOGO' width={100} />
            </Box>

            <Card sx={{ maxWidth: '28rem', backgroundColor: theme.palette.common.white }}>
                <Typography variant='h5' sx={{ mb: 2, textAlign: 'center', fontWeight: 600 }}>
                    Create an Account
                </Typography>

                <form noValidate autoComplete='off' onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {['firstName', 'lastName', 'companyName', 'email', 'password',  'city', 'country', 'telephone'].map((field, index) => (
                            <Grid item xs={12} key={index}>
                                <Typography variant='body1' sx={{ fontSize: '13px', fontWeight: '600' }}>
                                    {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
                                </Typography>
                                <TextField
                                    fullWidth
                                    name={field}
                                    value={field.includes('address.') ? signupDetails.address[field.split('.')[1] as keyof Address] : signupDetails[field as keyof State]}
                                    onChange={field.includes('address.') ? handleAddressChange(field.split('.')[1] as keyof Address) : handleChange(field as keyof State)}
                                    sx={{
                                        height: '20px',
                                        marginBottom: 1,
                                        padding: '2px',
                                        '& .MuiInputBase-input': {
                                            padding: '10px 14px',
                                        },
                                        '@media (max-width: 480px)': {
                                            width: '100%', // Full width on small screens
                                        }
                                    }}
                                    type={field === 'password' ? (showPassword ? 'text' : 'password') : 'text'}
                                    InputProps={field === 'password' ? {
                                        endAdornment: (
                                            <InputAdornment position='end'>
                                                <IconButton onClick={togglePasswordVisibility} edge='end'>
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    } : undefined}
                                />
                            </Grid>
                        ))}

                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox checked={signupDetails.agreeToTerms} onChange={handleChange('agreeToTerms')} />}
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
                                size='large'
                                variant='contained'
                                sx={{
                                    backgroundColor: theme.palette.primary.main,
                                    color: theme.palette.primary.contrastText,
                                    font: '12px',
                                    padding: '8px 20px',
                                    textTransform: 'none',
                                    height: '35px',
                                    borderRadius: '8px',
                                    margin: '5px 0px 0px',
                                    '&:hover': {
                                        backgroundColor: theme.palette.secondary.main
                                    }
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
                        <Link href='/professional/login' passHref>
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
