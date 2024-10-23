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
    Button
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/router';

// Define the Material interface
interface Material {
    item: string;
    description: string;
    rate: number;
    image: string | null;
    isEditable: boolean;  // New property to track if a row is in edit mode
}

const ManageMaterial = () => {
    const theme = useTheme();
    const router = useRouter();

    const [materials, setMaterials] = useState<Material[]>([
        { item: 'Cement', description: 'Simba', rate: 10, image: null, isEditable: false },
        { item: 'Steel Rods', description: 'Reinforced Steel', rate: 200, image: null, isEditable: false },
    ]);

    // Handle input changes for a material
    const handleMaterialChange = (index: number, field: keyof Material, value: string | number) => {
        const updatedMaterials = [...materials];
        updatedMaterials[index] = {
            ...updatedMaterials[index],
            [field]: value,
        };
        setMaterials(updatedMaterials);
    };

    // Add a new row immediately below the clicked row
    const addMaterial = (index: number) => {
        const newMaterial: Material = { item: '', description: '', rate: 0, image: null, isEditable: true };
        const updatedMaterials = [...materials];
        updatedMaterials.splice(index + 1, 0, newMaterial);
        setMaterials(updatedMaterials);
    };

    // Remove a material row
    const removeMaterial = (index: number) => {
        const updatedMaterials = materials.filter((_, i) => i !== index);
        setMaterials(updatedMaterials);
    };

    // Toggle edit mode for a row
    const toggleEditMode = (index: number) => {
        const updatedMaterials = [...materials];
        updatedMaterials[index].isEditable = !updatedMaterials[index].isEditable;
        setMaterials(updatedMaterials);
    };

    // Handle image upload
    const handleImageUpload = (index: number, file: File | null) => {
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const updatedMaterials = [...materials];
                updatedMaterials[index].image = reader.result as string;
                setMaterials(updatedMaterials);
            };
            reader.readAsDataURL(file);
        }
    };

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
                onClick={() => router.back()}
            >
                <ArrowBackIcon />
            </IconButton>

            <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography variant="h3" sx={{ fontWeight: 'bold', color: theme.palette.primary.main, fontSize: '16PX' }}>Material Index</Typography>
            </Box>

            <TableContainer component={Paper} sx={{
                boxShadow: 3,
                maxHeight: '400px',
                overflowY: 'auto',
                overflowX: 'auto',
            }}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ backgroundColor: theme.palette.background.paper, }}>Item</TableCell>
                            <TableCell sx={{ backgroundColor: theme.palette.background.paper, }}>Description</TableCell>
                            <TableCell sx={{ backgroundColor: theme.palette.background.paper, }}>Rate</TableCell>
                            <TableCell sx={{ backgroundColor: theme.palette.background.paper, }}>Image</TableCell>
                            <TableCell sx={{ backgroundColor: theme.palette.background.paper, }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {materials.map((material, index) => (
                            <TableRow key={index}>
                                <TableCell sx={{ minWidth: 150 }}>  {/* Set min-width for responsive behavior */}
                                    <TextField
                                        fullWidth
                                        variant="standard"
                                        value={material.item}
                                        onChange={(e) => handleMaterialChange(index, 'item', e.target.value)}
                                        disabled={!material.isEditable}  // Disable if not in edit mode
                                    />
                                </TableCell>
                                <TableCell sx={{ minWidth: 200 }}>
                                    <TextField
                                        fullWidth
                                        variant="standard"
                                        value={material.description}
                                        onChange={(e) => handleMaterialChange(index, 'description', e.target.value)}
                                        disabled={!material.isEditable}  // Disable if not in edit mode
                                    />
                                </TableCell>
                                <TableCell sx={{ minWidth: 100 }}>
                                    <TextField
                                        fullWidth
                                        variant="standard"
                                        type="number"
                                        value={material.rate}
                                        onChange={(e) => handleMaterialChange(index, 'rate', e.target.value)}
                                        disabled={!material.isEditable}  // Disable if not in edit mode
                                    />
                                </TableCell>
                                {/* <TableCell sx={{ minWidth: 150 }}>
                                    <Button variant="contained" component="label" disabled={!material.isEditable}>
                                        Upload
                                        <input
                                            type="file"
                                            hidden
                                            accept="image/*"
                                            onChange={(e) =>
                                                e.target.files ? handleImageUpload(index, e.target.files[0]) : null
                                            }
                                        />
                                    </Button>
                                    {material.image && (
                                        <Box mt={1}>
                                            <img
                                                src={material.image}
                                                alt="uploaded"
                                                style={{ maxWidth: '100px', maxHeight: '100px' }}
                                            />
                                        </Box>
                                    )}
                                </TableCell> */}

<TableCell sx={{ minWidth: 150 }}>
                                    {!material.image || material.isEditable ? (
                                        <Button variant="contained" component="label">
                                            Upload
                                            <input
                                                type="file"
                                                hidden
                                                accept="image/*"
                                                onChange={(e) =>
                                                    e.target.files ? handleImageUpload(index, e.target.files[0]) : null
                                                }
                                            />
                                        </Button>
                                    ) : (
                                        <Box mt={1}>
                                            <img
                                                src={material.image}
                                                alt="uploaded"
                                                style={{ maxWidth: '100px', maxHeight: '100px' }}
                                            />
                                        </Box>
                                    )}
                                </TableCell>
                                <TableCell sx={{ minWidth: 150 }}>
                                    <IconButton onClick={() => addMaterial(index)} color="secondary">
                                        <AddIcon />
                                    </IconButton>
                                    <IconButton onClick={() => removeMaterial(index)} color="primary">
                                        -
                                    </IconButton>
                                    <IconButton onClick={() => toggleEditMode(index)} color="secondary">
                                        {material.isEditable ? 'save' : <EditIcon />}
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default ManageMaterial;
