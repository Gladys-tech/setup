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
    const { phase, color } = router.query;
    const [contactVisible, setContactVisible] = useState(false);

    const contactNumber = "0757763516";

    // Ensure color is a string; use a fallback color if it's not defined
    const phaseColor = Array.isArray(color) ? color[0] : color || theme.palette.primary.main;

    // State to manage the materials list with initial data
    const [materials] = useState<Material[]>([
        { item: 'Cement', description: 'Simba', unit: 'Bags', quantity: 50, rate: 10, amount: 500 },
        { item: 'Steel Rods', description: 'Reinforced Steel', unit: 'Tons', quantity: 5, rate: 200, amount: 1000 },
        { item: 'Sand', description: 'Lake Sand', unit: 'Cubic meters', quantity: 20, rate: 15, amount: 300 },
    ]);

    // Calculate total amount
    const totalAmount = materials.reduce((total, material) => total + material.amount, 0);

    // Toggle contact number visibility
    const handleContactToggle = () => {
        setContactVisible(!contactVisible);
    };

    return (
        <Box p={4} position="relative">

            {/* Back arrow button for easy navigation */}
            <IconButton
                sx={{
                    position: 'fixed',
                    top: 75,
                    left: 16,
                    width: '30px', // Adjust icon button size
                    height: '30px',
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
            <Typography variant="h5" sx={{ mb: 2, }}>
                Material Schedule for{' '}
                <span style={{ fontWeight: 'bold', color: phaseColor }}>{phase}</span>
            </Typography>
            {/* border: `2px solid ${color}` */}

            <TableContainer component={Paper} sx={{ boxShadow: 3, overflowX: 'auto', minWidth: 300, maxHeight: 380, overflowY: 'auto' }}>
                <Table stickyHeader aria-label="simple table" sx={{ borderCollapse: 'collapse' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 600, padding: '6px 10px', position: 'sticky', top: 0, backgroundColor: theme.palette.background.paper, zIndex: 1, color: phaseColor, }}>
                                Item
                            </TableCell>
                            <TableCell sx={{ fontWeight: 600, padding: '6px 10px', position: 'sticky', top: 0, backgroundColor: theme.palette.background.paper, zIndex: 1, color: phaseColor, }}>
                                Description
                            </TableCell>
                            <TableCell sx={{ fontWeight: 600, padding: '6px 10px', position: 'sticky', top: 0, backgroundColor: theme.palette.background.paper, zIndex: 1, color: phaseColor, }}>
                                Unit
                            </TableCell>
                            <TableCell sx={{ fontWeight: 600, padding: '6px 10px', position: 'sticky', top: 0, backgroundColor: theme.palette.background.paper, zIndex: 1, color: phaseColor, }}>
                                Quantity
                            </TableCell>
                            <TableCell sx={{ fontWeight: 600, padding: '6px 10px', position: 'sticky', top: 0, backgroundColor: theme.palette.background.paper, zIndex: 1, color: phaseColor, }}>
                                Rate
                            </TableCell>
                            <TableCell sx={{ fontWeight: 600, padding: '6px 10px', position: 'sticky', top: 0, backgroundColor: theme.palette.background.paper, zIndex: 1, color: phaseColor, }}>
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

            {/* Fixed Call Icon with Contact Number */}
            <Box position="relative" sx={{ position: 'fixed', bottom: 45, right: 16 }}>
                {contactVisible && (
                    <Box
                        sx={{
                            position: 'absolute',
                            bottom: '60px',
                            right: '0',
                            backgroundColor: theme.palette.background.paper,
                            padding: '4px 8px',
                            borderRadius: '4px',
                            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
                        }}
                    >
                        <Typography variant="body2">{contactNumber}</Typography>
                    </Box>
                )}
                <IconButton
                    sx={{
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                        borderRadius: '50%',
                        '&:hover': { backgroundColor: theme.palette.secondary.main },
                    }}
                    onClick={handleContactToggle} // Toggle contact number visibility
                >
                    <CallIcon />
                </IconButton>
            </Box>

        </Box>
    );
};

export default MaterialSchedule;
