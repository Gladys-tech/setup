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
    TextField,
    IconButton,
    Paper,
    useTheme,
    Select,
    MenuItem,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

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

    const itemDescriptions: { [key: string]: { description: string; rate: number }[] } = {
        'Cement': [
            { description: 'Simba', rate: 10 },
            { description: 'Tororo', rate: 12 },
            { description: 'Hima', rate: 11 },
        ],
    };

    // State to manage the materials list with initial data
    const [materials, setMaterials] = useState<Material[]>([
        { item: 'Cement', description: 'Simba', unit: 'Bags', quantity: 50, rate: 10, amount: 500 },
        { item: 'Steel Rods', description: 'Reinforced Steel', unit: 'Tons', quantity: 5, rate: 200, amount: 1000 },
        { item: 'Sand', description: 'Lake Sand', unit: 'Cubic meters', quantity: 20, rate: 15, amount: 300 },
    ]);

    // Handle input changes for a material
    const handleMaterialChange = (index: number, field: keyof Material, value: string | number) => {
        const numericValue = (field === 'quantity' || field === 'rate') ? Number(value) : value;

        const updatedMaterials = [...materials];
        updatedMaterials[index] = {
            ...updatedMaterials[index],
            [field]: numericValue,
            amount: (field === 'quantity' || field === 'rate')
                ? (typeof updatedMaterials[index].quantity === 'number' ? updatedMaterials[index].quantity : 0) * (typeof numericValue === 'number' ? numericValue : 0)
                : updatedMaterials[index].amount,
        };
        setMaterials(updatedMaterials);
    };

    // Add an empty row for a new material below the clicked row
    const addMaterial = (index: number) => {
        const newMaterial = { item: '', description: '', unit: '', quantity: 0, rate: 0, amount: 0 };
        const updatedMaterials = [...materials];
        updatedMaterials.splice(index + 1, 0, newMaterial); // Insert new material below the clicked row
        setMaterials(updatedMaterials);
    };

    // Remove a material row
    const removeMaterial = (index: number) => {
        const updatedMaterials = materials.filter((_, i) => i !== index);
        setMaterials(updatedMaterials);
    };

    // Calculate total amount
    const totalAmount = materials.reduce((total, material) => total + material.amount, 0);

    return (
        <Box p={4} position="relative">

            {/* Back arrow button for easy navigation */}
            <IconButton
                sx={{
                    position: 'fixed',
                    top: 75,
                    left: 16, // Place it on the left for easy access
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
                            <TableCell sx={{ fontWeight: 600, padding: '6px 10px', position: 'sticky', top: 0, backgroundColor: theme.palette.background.paper, zIndex: 1 }}>
                                Actions
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {materials.map((material, index) => (
                            <TableRow key={index} sx={{ height: '20px', cursor: 'pointer' }}>
                                <TableCell sx={{ padding: '4px 8px' }}>
                                    <TextField
                                        fullWidth
                                        variant="standard"
                                        value={material.item}
                                        onChange={(e) => handleMaterialChange(index, 'item', e.target.value)}
                                        InputProps={{
                                            disableUnderline: true,
                                        }}
                                    />
                                </TableCell>
                                {/* <TableCell sx={{ padding: '4px 8px' }}>
                                    <TextField
                                        fullWidth
                                        variant="standard"
                                        value={material.description}
                                        onChange={(e) => handleMaterialChange(index, 'description', e.target.value)}
                                        InputProps={{
                                            disableUnderline: true,
                                        }}
                                    />
                                </TableCell> */}
                                <TableCell sx={{ padding: '4px 8px' }}>
                                    {itemDescriptions[material.item] ? (
                                        <Select
                                            fullWidth
                                            value={material.description}
                                            onChange={(e) => {
                                                const selectedDescription = e.target.value as string;
                                                const selectedRate = itemDescriptions[material.item].find(
                                                    (desc) => desc.description === selectedDescription
                                                )?.rate || 0;
                                                handleMaterialChange(index, 'description', selectedDescription);
                                                handleMaterialChange(index, 'rate', selectedRate);
                                            }}
                                            variant="standard"
                                        >
                                            {itemDescriptions[material.item].map((option, i) => (
                                                <MenuItem key={i} value={option.description}>
                                                    {option.description}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    ) : (
                                        <TextField
                                            fullWidth
                                            variant="standard"
                                            value={material.description}
                                            onChange={(e) => handleMaterialChange(index, 'description', e.target.value)}
                                            InputProps={{
                                                disableUnderline: true,
                                            }}
                                        />
                                    )}
                                </TableCell>
                                <TableCell sx={{ padding: '4px 8px' }}>
                                    <TextField
                                        fullWidth
                                        variant="standard"
                                        value={material.unit}
                                        onChange={(e) => handleMaterialChange(index, 'unit', e.target.value)}
                                        InputProps={{
                                            disableUnderline: true,
                                        }}
                                    />
                                </TableCell>
                                <TableCell sx={{ padding: '4px 8px' }}>
                                    <TextField
                                        type="number"
                                        fullWidth
                                        variant="standard"
                                        value={material.quantity}
                                        onChange={(e) => handleMaterialChange(index, 'quantity', e.target.value)}
                                        InputProps={{
                                            disableUnderline: true,
                                        }}
                                    />
                                </TableCell>
                                <TableCell sx={{ padding: '4px 8px' }}>
                                    <TextField
                                        type="number"
                                        fullWidth
                                        variant="standard"
                                        value={material.rate}
                                        onChange={(e) => handleMaterialChange(index, 'rate', e.target.value)}
                                        InputProps={{
                                            disableUnderline: true,
                                        }}
                                    />
                                </TableCell>
                                <TableCell sx={{ padding: '4px 8px' }}>{material.amount}</TableCell>
                                <TableCell sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    padding: '4px 8px',
                                    flexDirection: 'column',
                                    alignItems: 'flex-start',
                                }}>
                                    <Box display="flex" flexDirection="row">
                                        <IconButton onClick={() => addMaterial(index)} color="secondary">
                                            <AddIcon />
                                        </IconButton>
                                        <IconButton onClick={() => removeMaterial(index)} color="primary">
                                            -
                                        </IconButton>
                                    </Box>
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
        </Box>
    );
};

export default MaterialSchedule;
