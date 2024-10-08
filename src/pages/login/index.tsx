import { ChangeEvent, MouseEvent, ReactNode, useState } from 'react'

// ** Next Imports
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import MuiCard, { CardProps } from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'

// ** Icons Imports
 import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

// ** Configs

// ** Context
import FormControlLabel from '@mui/material/FormControlLabel'
import AuthLayout from '../../layouts/AuthLayout'
import { API_BASE_URL } from '../api/http.api'
import { useUser } from 'src/context/UserContext'

interface State {
  email: string
  password: string
  showPassword: boolean
}

// ** Styled Components
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  width: '100%',
  maxWidth: '400px', // Adjust width to match the card size in the design
  margin: '0 auto',
  padding: theme.spacing(5),
  borderRadius: theme.shape.borderRadius * 2, // Rounded corners
  boxShadow: theme.shadows[3],
  backgroundColor: theme.palette.background.paper
}))

const LoginPage = () => {
  const [values, setValues] = useState<State>({
    email: '',
    password: '',
    showPassword: false
  })

  const theme = useTheme()
  const router = useRouter()
  const { setUser } = useUser() // Use context to set user after login

  const handleChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    try {
      const response = await fetch(`${API_BASE_URL}/login-professional`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const responseData = await response.json();
      const { user, token } = responseData; // Extract user and token from response
      setUser(user); // Set user after successful login
      router.push('/pages/dashboard'); // Redirect to dashboard
      localStorage.setItem('user', JSON.stringify(user)); // Store user in local storage
      localStorage.setItem('token', token); // Store token in local storage

    } catch (error) {
      console.error('Login failed:', error instanceof Error ? error.message : 'Unknown error');

      // Handle login error and display an alert
      alert('Login failed. Please try again.');
    }
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.palette.background.default // Use background from theme
      }}
    >
      <Card>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <img src='/images/LOGO.png' alt='LOGO' width={80} /> {/* Logo */}
          {/* <Typography variant='h6' sx={{ mt: 2, color: '#6c757d' }}>
            LOGO
          </Typography> */}
        </Box>
        <Typography variant='h5' sx={{ mb: 3, textAlign: 'center', fontWeight: 600 }}>
          Sign In
        </Typography>
        <Typography variant='body2' sx={{ textAlign: 'center', mb: 4, color: '#6c757d' }}>
          Enter your username and password to sign in
        </Typography>
        <form noValidate autoComplete='off' onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label='Your Username'
            value={values.email}
            onChange={handleChange('email')}
            sx={{ mb: 3 }}
            InputLabelProps={{ shrink: true }}
          />
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel htmlFor='auth-login-password'>Password</InputLabel>
            <OutlinedInput
              label='Password'
              value={values.password}
              onChange={handleChange('password')}
              type={values.showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    edge='end'
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {values.showPassword ? <EyeOutline /> : <EyeOffOutline />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <Button
            fullWidth
            size='large'
            variant='contained'
            sx={{
              backgroundColor: theme.palette.primary.main, // Use primary color from theme
              color: theme.palette.primary.contrastText, // Use contrast text color from theme
              textTransform: 'none',
              '&:hover': {
                backgroundColor: theme.palette.secondary.main // Use secondary color for hover
              },
              mb: 3,
              borderRadius: '8px' 
            }}
            type='submit'
          >
            Sign In
          </Button>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <FormControlLabel control={<Checkbox />} label='Remember Me' />
            <Link href='/forgot-password' passHref>
              <Typography variant='body2' sx={{ color: theme.palette.primary.main, cursor: 'pointer' }}>
                Forgot Password?
              </Typography>
            </Link>
          </Box>
          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Typography variant='body2' sx={{ color: '#6c757d', mb: 1 }}>
              Don't have an account?
            </Typography>
            <Link href='/signup' passHref>
              <Typography variant='body2' sx={{ color: theme.palette.primary.main, fontWeight: 600, cursor: 'pointer' }}>
                Sign Up Here
              </Typography>
            </Link>
          </Box>
        </form>
      </Card>
    </Box>
  )
}

LoginPage.getLayout = (page: ReactNode) => <AuthLayout>{page}</AuthLayout>

export default LoginPage
