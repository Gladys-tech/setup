import { useRouter } from 'next/router';
import { useState } from 'react';
import {
    Box,
    Typography,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    IconButton,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    useTheme,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

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

    // State to manage the materials list
    const [materials, setMaterials] = useState<Material[]>([]); // Specify the type as Material[]
    const [openDialog, setOpenDialog] = useState(false);
    const [newMaterial, setNewMaterial] = useState<Material>({
        item: '',
        description: '',
        unit: '',
        quantity: 0,
        rate: 0,
        amount: 0,
    });

    // Handle input changes for new material
    const handleNewMaterialChange = (field: keyof Material, value: string | number) => {
        const numericValue = (field === 'quantity' || field === 'rate') ? Number(value) : value;

        setNewMaterial(prev => ({
            ...prev,
            [field]: numericValue,
            amount: (field === 'quantity' || field === 'rate')
                ? (typeof prev.quantity === 'number' ? prev.quantity : 0) * (typeof numericValue === 'number' ? numericValue : 0)
                : prev.amount,
        }));
    };
    // Add a new material to the list
    const addMaterial = () => {
        setMaterials([...materials, newMaterial]);
        setOpenDialog(false);
        setNewMaterial({
            item: '',
            description: '',
            unit: '',
            quantity: 0,
            rate: 0,
            amount: 0,
        });
    };

    // Remove a material row
    const removeMaterial = (index: number) => {
        const updatedMaterials = materials.filter((_, i) => i !== index);
        setMaterials(updatedMaterials);
    };

    return (
        <Box p={4} position='relative'>
            <Typography variant="h5">
                Material Schedule for {' '}
                <span style={{ color: theme.palette.primary.main, fontWeight: 'bold' }}>{phase}</span>
            </Typography>

            {/* Button to open the dialog for adding a new material */}
            <Button variant="contained" onClick={() => setOpenDialog(true)}
                sx={{
                    position: 'absolute',
                    top: 5,
                    right: 16,
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                    font: '12px',
                    textTransform: 'none',
                    height: '30px',
                    mb: 2,
                    borderRadius: '6px',
                    '&:hover': {
                        backgroundColor: theme.palette.secondary.main
                    }
                }}
            // sx={{ mb: 2 }}
            >
                Add Material
            </Button>

            <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="responsive table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Item</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Unit</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Rate</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {materials.map((material, index) => (
                            <TableRow key={index}>
                                <TableCell>{material.item}</TableCell>
                                <TableCell>{material.description}</TableCell>
                                <TableCell>{material.unit}</TableCell>
                                <TableCell>{material.quantity}</TableCell>
                                <TableCell>{material.rate}</TableCell>
                                <TableCell>{material.amount}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => removeMaterial(index)} color="error">
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Dialog for adding new material */}
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>Add New Material</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Item"
                        fullWidth
                        value={newMaterial.item}
                        onChange={(e) => handleNewMaterialChange('item', e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Description"
                        fullWidth
                        value={newMaterial.description}
                        onChange={(e) => handleNewMaterialChange('description', e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Unit"
                        fullWidth
                        value={newMaterial.unit}
                        onChange={(e) => handleNewMaterialChange('unit', e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Quantity"
                        type="number"
                        fullWidth
                        value={newMaterial.quantity}
                        onChange={(e) => handleNewMaterialChange('quantity', parseFloat(e.target.value) || 0)}
                    />
                    <TextField
                        margin="dense"
                        label="Rate"
                        type="number"
                        fullWidth
                        value={newMaterial.rate}
                        onChange={(e) => handleNewMaterialChange('rate', parseFloat(e.target.value) || 0)}
                    />
                    <TextField
                        margin="dense"
                        label="Amount"
                        fullWidth
                        value={newMaterial.amount}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                    <Button onClick={addMaterial} color="primary">Add</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default MaterialSchedule;

