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
    IconButton,
    FormControl,
    Select,
    MenuItem,
    Slider
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CallIcon from '@mui/icons-material/Call';
import { API_BASE_URL } from 'src/pages/api/http.api';

// Define the Material interface
interface Material {
    variationOptions: any;
    // variationOptions: { description: string; rate: number }[]; // Modified to define variations
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
    const { phaseName, color, contactNumber } = router.query;
    const { id } = router.query;

    // State to manage the materials list
    const [materials, setMaterials] = useState<Material[]>([]);
    const [contactVisible, setContactVisible] = useState(false);
    const [laborPercentage, setLaborPercentage] = useState<number>(15); // Initial percentage for labor


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

    // Function to update description, rate, and amount
    const handleDescriptionChange = (id: string, newDescription: string, newRate: number) => {
        setMaterials(prevMaterials =>
            prevMaterials.map(material =>
                material.id === id
                    ? {
                        ...material,
                        description: newDescription,
                        rate: newRate,
                        amount: newRate * material.quantity, // Recalculate amount
                    }
                    : material
            )
        );
    };


    // Calculate total amount
    const totalAmount = materials.reduce((total, material) => total + Number(material.amount || 0), 0);


    // Calculate labor cost based on the slider percentage
    const laborAmount = (totalAmount * laborPercentage) / 100;

    // Calculate grand total
    const grandTotal = totalAmount + laborAmount;

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

            <TableContainer component={Paper} sx={{ boxShadow: 3, overflowX: 'auto', minWidth: 300, maxHeight: 250, overflowY: 'auto' }}>
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
                                    {/* Description Dropdown */}
                                    <FormControl fullWidth>
                                        <Select
                                            value={material.variationOptions?.length > 0 ? material.description : material.description}
                                            onChange={(e) => {
                                                const selectedOption = material.variationOptions?.find((option: { description: string; }) => option.description === e.target.value);
                                                if (selectedOption) {
                                                    handleDescriptionChange(material.id, e.target.value, selectedOption.rate);
                                                }
                                            }}
                                        >
                                            {/* If variationOptions is empty, just display the material.description */}
                                            {material.variationOptions?.length > 0 ? (
                                                material.variationOptions?.map((option: { description: any; }, idx: any) => (
                                                    <MenuItem key={idx} value={option.description}>
                                                        {option.description}
                                                    </MenuItem>
                                                ))
                                            ) : (
                                                // If variationOptions is empty, just show the description
                                                <MenuItem value={material.description}>
                                                    {material.description}
                                                </MenuItem>
                                            )}
                                        </Select>
                                    </FormControl>
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

            {/* Labor Slider */}
            <Box mt={2}>
                <Typography variant="body1">Labor Percentage: {laborPercentage}%</Typography>
                <Slider
                    value={laborPercentage}
                    min={15}
                    max={30}
                    step={1}
                    onChange={(e, value) => setLaborPercentage(value as number)}
                    aria-labelledby="labor-slider"
                    sx={{ width: 300, mx: 'auto' }}
                />
                <Typography variant="body1">Labor Amount: {laborAmount.toFixed(2)}</Typography>
            </Box>

            {/* Grand Total */}
            <Box display="flex" justifyContent="flex-end" mt={2}>
                <Typography variant="h5">Grand Total: {grandTotal}</Typography>
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
