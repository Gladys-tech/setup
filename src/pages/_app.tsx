
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import DefaultPalette from '../theme/palette';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { Box, createTheme } from '@mui/material';
import { useEffect } from 'react';
import { ThemeProviderWrapper } from '../ThemeContext';
import { NextPage } from 'next';
import { UserProvider } from 'src/context/UserContext';

// Extend the NextPage type to include a `getLayout` method
type NextPageWithLayout = NextPage & {
    getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppPropsWithLayout) {
    // Create the theme using DefaultPalette, which now matches MUI's expected structure
    const palette = DefaultPalette('light', 'primary');
    const theme = createTheme({ palette }); // Apply the palette directly

    useEffect(() => {
        document.body.style.background = 'radial-gradient(circle at bottom, #FFFFFF 80%, #92E000 20%)';
    }, []);

    // Check if the page has a custom layout, like `AuthLayout`, or fallback to default
    const getLayout = Component.getLayout || ((page) => (
        <Box sx={{ display: 'flex', height: '100vh' }}>
            {/* Main content with navbar and sidebar */}
            <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <Navbar />
                <Box sx={{ display: 'flex', flex: 1 }}>
                    {/* Sidebar */}
                    <Box
                        sx={{
                            width: 250, // Adjust width as needed
                            backgroundColor: '#f4f4f4', // Sidebar background color
                            borderRight: '1px solid #ccc', // Optional border
                        }}
                    >
                        <Sidebar />
                    </Box>
                    {/* Page content */}
                    <Box
                        sx={{
                            flex: 1, // Take remaining space
                            padding: 2, // Optional padding for content
                            overflowY: 'auto', // Allow scrolling in the content area
                        }}
                    >
                        {page}
                    </Box>
                </Box>
            </Box>
        </Box>
    ));

    return (
        <SessionProvider session={session}>
            <UserProvider>
            <ThemeProviderWrapper>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    {getLayout(<Component {...pageProps} />)}
                </ThemeProvider>
            </ThemeProviderWrapper>
            </UserProvider>
        </SessionProvider>
    );
}

export default MyApp;


