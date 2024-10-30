import { ChangeEvent, MouseEvent, ReactNode, useState } from 'react';

// ** Next Imports
import Link from 'next/link';
import { useRouter } from 'next/router';

// ** MUI Components
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled, useTheme } from '@mui/material/styles';
import MuiCard, { CardProps } from '@mui/material/Card';
import InputAdornment from '@mui/material/InputAdornment';

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline';
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline';

// ** Context
import AuthLayout from '../../layouts/AuthLayout';
import { API_BASE_URL } from '../api/http.api';
import { useUser } from 'src/context/UserContext';

interface State {
    email: string;
    password: string;
    showPassword: boolean;
}

// ** Styled Components
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
    width: '100%',
    maxWidth: '28rem',
    margin: '0 auto',
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius * 2,
    boxShadow: theme.shadows[3],
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.down('sm')]: {
        width: '90%', // Adjust card width for smaller screens
    },
}));

const LoginPage = () => {
    const [values, setValues] = useState<State>({
        email: '',
        password: '',
        showPassword: false,
    });

    const theme = useTheme();
    const router = useRouter();
    const { setUser , setToken} = useUser();

    const handleChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleSubmit = async (event: { preventDefault: () => void }) => {
        event.preventDefault();

        try {
            const response = await fetch(`${API_BASE_URL}/login/client`, {
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
            const { user, token } = responseData;
            // Use setUser to update the context and localStorage with the new user data
            setUser(user);
            setToken(token);
            router.push('/pages/client');
        } catch (error) {
            console.error('Login failed:', error instanceof Error ? error.message : 'Unknown error');
            alert('Login failed. Please try again.');
        }
    };

    return (
        <Box
            sx={{
                maxHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: theme.palette.background.default,
            }}
        >
            <Box sx={{ mb: 2, mt: 6 }}>
                <img src='/images/LOGO.png' alt='LOGO' width={100} />
            </Box>

            <Card sx={{ maxHeight: '24rem', padding: '32px' }}>
                <Typography
                    variant='h5'
                    sx={{ textAlign: 'center', fontWeight: 700, fontSize: '24px', lineHeight: '2rem' }}
                >
                    Sign In
                </Typography>
                <Typography variant='body2' sx={{ textAlign: 'center', color: '#6c757d', fontSize: '16px', margin: '0 0 8px' }}>
                    Enter your username and password to sign in
                </Typography>

                <form noValidate autoComplete='off' onSubmit={handleSubmit}>
                    <InputLabel htmlFor='auth-login-email' sx={{ fontSize: '13px', mb: 1, fontWeight: 600 }}>Username</InputLabel>
                    <TextField
                        // id='auth-login-email'
                        fullWidth
                        value={values.email}
                        onChange={handleChange('email')}
                        sx={{ mb: 2 }}
                        InputProps={{
                            sx: {
                                height: '35px',
                                backgroundColor: theme.palette.common.white,
                            }
                        }}
                    />

                    <InputLabel htmlFor='auth-login-password' sx={{ fontSize: '13px', fontWeight: 600 }}>Password</InputLabel>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <OutlinedInput
                            // id='auth-login-password'
                            value={values.password}
                            onChange={handleChange('password')}
                            type={values.showPassword ? 'text' : 'password'}
                            sx={{ height: '35px', backgroundColor: theme.palette.common.white }}
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
                            backgroundColor: theme.palette.primary.main,
                            color: theme.palette.primary.contrastText,
                            padding: '8px 20px',
                            textTransform: 'none',
                            height: '35px',
                            borderRadius: '8px',
                            margin: '5px 0',
                        }}
                        type='submit'
                    >
                        Sign In
                    </Button>

                    <Box sx={{ mt: 1, textAlign: 'center' }}>
                        <Typography variant='body2' sx={{ color: '#6c757d', mb: 1 }}>
                            Don't have an account?
                        </Typography>
                        <Link href='/client/signup' passHref>
                            <Typography
                                variant='body2'
                                sx={{ color: theme.palette.primary.main, fontWeight: 700, cursor: 'pointer' }}
                            >
                                Sign Up Here
                            </Typography>
                        </Link>
                    </Box>
                </form>
            </Card>
        </Box>
    );
};

LoginPage.getLayout = (page: ReactNode) => <AuthLayout>{page}</AuthLayout>;

export default LoginPage;
