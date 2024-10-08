// src/layouts/AuthLayout.tsx
import React, { ReactNode } from 'react';
import { Box } from '@mui/material';

interface AuthLayoutProps {
    children: ReactNode; // Explicitly type the children prop
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
    return (
        <Box display="flex" minHeight="100vh">
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh">
                <Box width="100%" maxWidth="400px" p={3}>
                    {children}
                </Box>
            </Box>
        </Box>
    );
};

export default AuthLayout;
