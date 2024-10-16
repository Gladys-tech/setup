import { useRouter } from 'next/router';
import { useState } from 'react';
import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    useTheme,
    IconButton
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MessageIcon from '@mui/icons-material/Message';
import CallIcon from '@mui/icons-material/Call';

// Define the Material interface
interface Material {
    item: string;
    description: string;
    unit: string;
    quantity: number;
    rate: number;
    amount: number;
}

const MaterialSchedule = () => {
    const theme = useTheme();
    const router = useRouter();
    const { phase } = router.query;

    // State to manage the materials list with initial data
    const [materials] = useState<Material[]>([
        { item: 'Cement', description: 'Simba', unit: 'Bags', quantity: 50, rate: 10, amount: 500 },
        { item: 'Steel Rods', description: 'Reinforced Steel', unit: 'Tons', quantity: 5, rate: 200, amount: 1000 },
        { item: 'Sand', description: 'Lake Sand', unit: 'Cubic meters', quantity: 20, rate: 15, amount: 300 },
    ]);

    // Calculate total amount
    const totalAmount = materials.reduce((total, material) => total + material.amount, 0);

    return (
        <Box p={4} position="relative">

            {/* Back arrow button for easy navigation */}
            <IconButton
                sx={{
                    position: 'fixed',
                    top: 75,
                    left: 16,
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                    borderRadius: '50%',
                    '&:hover': {
                        backgroundColor: theme.palette.secondary.main,
                    },
                }}
                onClick={() => router.back()} // Navigates to the previous page
            >
                <ArrowBackIcon />
            </IconButton>
            <Typography variant="h5" sx={{ mb: 2 }}>
                Material Schedule for{' '}
                <span style={{ color: theme.palette.primary.main, fontWeight: 'bold' }}>{phase}</span>
            </Typography>

            <TableContainer component={Paper} sx={{ boxShadow: 3, overflowX: 'auto', minWidth: 300, maxHeight: 380, overflowY: 'auto' }}>
                <Table stickyHeader aria-label="simple table" sx={{ borderCollapse: 'collapse' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 600, padding: '6px 10px', position: 'sticky', top: 0, backgroundColor: theme.palette.background.paper, zIndex: 1 }}>
                                Item
                            </TableCell>
                            <TableCell sx={{ fontWeight: 600, padding: '6px 10px', position: 'sticky', top: 0, backgroundColor: theme.palette.background.paper, zIndex: 1 }}>
                                Description
                            </TableCell>
                            <TableCell sx={{ fontWeight: 600, padding: '6px 10px', position: 'sticky', top: 0, backgroundColor: theme.palette.background.paper, zIndex: 1 }}>
                                Unit
                            </TableCell>
                            <TableCell sx={{ fontWeight: 600, padding: '6px 10px', position: 'sticky', top: 0, backgroundColor: theme.palette.background.paper, zIndex: 1 }}>
                                Quantity
                            </TableCell>
                            <TableCell sx={{ fontWeight: 600, padding: '6px 10px', position: 'sticky', top: 0, backgroundColor: theme.palette.background.paper, zIndex: 1 }}>
                                Rate
                            </TableCell>
                            <TableCell sx={{ fontWeight: 600, padding: '6px 10px', position: 'sticky', top: 0, backgroundColor: theme.palette.background.paper, zIndex: 1 }}>
                                Amount
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {materials.map((material, index) => (
                            <TableRow key={index} sx={{ height: '20px', cursor: 'pointer' }}>
                                <TableCell sx={{ padding: '4px 8px' }}>
                                    <Typography>{material.item}</Typography>
                                </TableCell>
                                <TableCell sx={{ padding: '4px 8px' }}>
                                    <Typography>{material.description}</Typography>
                                </TableCell>
                                <TableCell sx={{ padding: '4px 8px' }}>
                                    <Typography>{material.unit}</Typography>
                                </TableCell>
                                <TableCell sx={{ padding: '4px 8px' }}>
                                    <Typography>{material.quantity}</Typography>
                                </TableCell>
                                <TableCell sx={{ padding: '4px 8px' }}>
                                    <Typography>{material.rate}</Typography>
                                </TableCell>
                                <TableCell sx={{ padding: '4px 8px' }}>
                                    <Typography>{material.amount}</Typography>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Total Amount Display */}
            <Box display="flex" justifyContent="flex-end" mt={2}>
                <Typography variant="h6">
                    Total Amount: {totalAmount}
                </Typography>
            </Box>

            {/* Fixed Call or Message Button */}
            <Box
                sx={{
                    position: 'fixed',
                    bottom: 16,
                    right: 16,
                    zIndex: 1000,
                }}
            >
                <IconButton
                    sx={{
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                        '&:hover': {
                            backgroundColor: theme.palette.secondary.main,
                        },
                    }}
                    href="tel:+1234567890" // `mailto:example@mail.com` for email.
                >
                    <CallIcon /> {/*  <MessageIcon /> for message */}
                </IconButton>
            </Box>
        </Box>
    );
};

export default MaterialSchedule;
