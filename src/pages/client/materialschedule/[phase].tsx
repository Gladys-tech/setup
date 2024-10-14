import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
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
    Paper,
    useTheme,
    Select,
    MenuItem,
} from '@mui/material';

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

    // Update amount based on selected description
    // useEffect(() => {
    //     const updatedMaterials = materials.map(material => {
    //         const selectedDescription = itemDescriptions[material.item].find(
    //             desc => desc.description === material.description
    //         );
    //         const updatedRate = selectedDescription ? selectedDescription.rate : 0;
    //         return {
    //             ...material,
    //             rate: updatedRate,
    //             amount: material.quantity * updatedRate,
    //         };
    //     });
    //     setMaterials(updatedMaterials);
    // }, [materials]);


    useEffect(() => {
        const updatedMaterials = materials.map(material => {
            const itemDescriptionArray = itemDescriptions[material.item];
    
            // Check if itemDescriptionArray is defined
            if (itemDescriptionArray) {
                const selectedDescription = itemDescriptionArray.find(
                    desc => desc.description === material.description
                );
                const updatedRate = selectedDescription ? selectedDescription.rate : 0;
    
                // Return the updated material with the new rate
                return {
                    ...material,
                    rate: updatedRate,
                    amount: material.quantity * updatedRate,
                };
            }
    
            // If no descriptions found, return the material without changes
            return material;
        });
    
        setMaterials(updatedMaterials);
    }, [materials, itemDescriptions]);
    
    // Calculate total amount
    const totalAmount = materials.reduce((total, material) => total + material.amount, 0);

    return (
        <Box p={4} position="relative">
            <Typography variant="h5">
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
        <TableRow key={index} sx={{ height: '20px' }}>
            <TableCell sx={{ padding: '4px 8px' }}>
                <TextField
                    fullWidth
                    variant="standard"
                    value={material.item}
                    InputProps={{
                        disableUnderline: true,
                        readOnly: true,
                    }}
                />
            </TableCell>
            <TableCell sx={{ padding: '4px 8px' }}>
                <Select
                    fullWidth
                    value={material.description}
                    onChange={(e) => {
                        const selectedDescription = e.target.value as string;
                        const selectedRate = itemDescriptions[material.item]?.find(
                            (desc) => desc.description === selectedDescription
                        )?.rate || 0;
                        setMaterials(prevMaterials => {
                            const updatedMaterials = [...prevMaterials];
                            updatedMaterials[index].description = selectedDescription;
                            updatedMaterials[index].rate = selectedRate;
                            updatedMaterials[index].amount = updatedMaterials[index].quantity * selectedRate;
                            return updatedMaterials;
                        });
                    }}
                    variant="standard"
                >
                    {itemDescriptions[material.item]?.map((option, i) => (
                        <MenuItem key={i} value={option.description}>
                            {option.description}
                        </MenuItem>
                    )) || (
                        <MenuItem disabled>No options available</MenuItem>
                    )}
                </Select>
            </TableCell>
            <TableCell sx={{ padding: '4px 8px' }}>
                <TextField
                    fullWidth
                    variant="standard"
                    value={material.unit}
                    InputProps={{
                        disableUnderline: true,
                        readOnly: true,
                    }}
                />
            </TableCell>
            <TableCell sx={{ padding: '4px 8px' }}>
                <TextField
                    type="number"
                    fullWidth
                    variant="standard"
                    value={material.quantity}
                    InputProps={{
                        disableUnderline: true,
                        readOnly: true,
                    }}
                />
            </TableCell>
            <TableCell sx={{ padding: '4px 8px' }}>
                <TextField
                    type="number"
                    fullWidth
                    variant="standard"
                    value={material.rate}
                    InputProps={{
                        disableUnderline: true,
                        readOnly: true,
                    }}
                />
            </TableCell>
            <TableCell sx={{ padding: '4px 8px' }}>{material.amount}</TableCell>
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
