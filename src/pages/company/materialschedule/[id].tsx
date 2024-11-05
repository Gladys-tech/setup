import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
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
import { API_BASE_URL } from 'src/pages/api/http.api';

// Define the Material interface
interface Material {
    image: string | undefined;
    id: any;
    item: string;
    description: string;
    unit: string;
    quantity: number;
    rate: number;
    amount: number;
    createdBy: string;
    imageUrl: string;
    isEditable: boolean;  // New property to track if a row is in edit mode
    updatedBy?: User | null;
    phaseId?: string; // Add this if necessary
    phase?: {
        id: string;
        phaseName: string;
        phaseDescription: string;
    };
}

interface User {
    id: string;
    firstName: string;
    lastName: string;
}

const MaterialSchedule = () => {
    const theme = useTheme();
    const router = useRouter();
    const { phaseName, color , contactNumber } = router.query;
    const { id } = router.query;

    // State to manage the materials list
    const [materials, setMaterials] = useState<Material[]>([]);
    const [contactVisible, setContactVisible] = useState(false);


    // Fetch materials data from API when the component mounts or phase changes
    useEffect(() => {
        if (id) {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Token not found');
            }
            const apiUrl = `${API_BASE_URL}/material-schedules/phase/${id}/professional`;
            fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('materialschedule got', data)
                    setMaterials(data.materialSchedules);
                })
                .catch(error => {
                    console.error('Error fetching materials:', error);
                });
        }
    }, [id]);

    // Calculate total amount
    const totalAmount = materials.reduce((total, material) => total + Number(material.amount || 0), 0);

    // color is a string. use a fallback color if it's not defined
    const phaseColor = Array.isArray(color) ? color[0] : color || theme.palette.primary.main;

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
            <Typography variant="h5" sx={{ mb: 2 }}>
                Material Schedule for <span style={{ color: phaseColor, fontWeight: 'bold' }}>{phaseName}</span>
            </Typography>

            <TableContainer component={Paper} sx={{ boxShadow: 3, overflowX: 'auto', minWidth: 300, maxHeight: 380, overflowY: 'auto' }}>
                <Table stickyHeader aria-label="simple table" sx={{ borderCollapse: 'collapse' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 600, padding: '6px 10px', position: 'sticky', top: 0, backgroundColor: theme.palette.background.paper, zIndex: 1, color: phaseColor, }}>
                                Item Image
                            </TableCell>
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
                                    <img
                                        src={material.image}
                                        alt={`Material ${material.item}`}
                                        style={{ width: '50px', height: '50px', objectFit: 'cover' }} // Adjust size as necessary
                                    />
                                </TableCell>
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
                        <Typography variant="body2"> {contactNumber || 'Not available'}</Typography>
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
