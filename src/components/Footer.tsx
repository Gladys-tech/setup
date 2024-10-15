import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer: React.FC = () => {
    return (
        <Box
            sx={{
                padding: '16px',
                textAlign: 'center',
                fontFamily: 'Inter, sans-serif',
                position: 'relative',
                bottom: 0,
                width: '100%',
            }}
        >
            <Typography variant="body2" color="textSecondary">
                © {new Date().getFullYear()} Build Smart. All rights reserved.
            </Typography>
        </Box>
    );
};

export default Footer;
