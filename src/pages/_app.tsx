import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import DefaultPalette from '../theme/palette';
import { createTheme } from '@mui/material';
import { ThemeProviderWrapper } from '../ThemeContext';
import { NextPage } from 'next';
import { UserProvider } from 'src/context/UserContext';
import MainLayout from 'src/layouts/MainLayout';

// Extend the NextPage type to include a `getLayout` method
type NextPageWithLayout = NextPage & {
    getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};


function MyApp({ Component, pageProps: { session, ...pageProps } }: AppPropsWithLayout) {
    const palette = DefaultPalette('light', 'primary');
    const theme = createTheme({ palette });


    // Check for custom layouts or fallback to MainLayout
    const getLayout = Component.getLayout || ((page) => (
        <MainLayout>{page}</MainLayout>
    ));

    return (
        // <SessionProvider session={session}>
            <UserProvider>
                <ThemeProviderWrapper>
                    <ThemeProvider theme={theme}>
                        <CssBaseline />
                        {getLayout(<Component {...pageProps} />)}
                    </ThemeProvider>
                </ThemeProviderWrapper>
            </UserProvider>
        // </SessionProvider>
    );
}

export default MyApp;



