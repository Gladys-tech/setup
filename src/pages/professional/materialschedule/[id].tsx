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
    TextField,
    IconButton,
    Paper,
    useTheme,
    Button,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { API_BASE_URL } from 'src/pages/api/http.api';
import { initializeApp } from 'firebase/app';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';


// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBJaZqdti73p6_W5VLhL4cImtIP3yLPJho",
    authDomain: "fir-todo-19dea.firebaseapp.com",
    projectId: "fir-todo-19dea",
    storageBucket: "fir-todo-19dea.appspot.com",
    messagingSenderId: "546043032199",
    appId: "1:546043032199:web:382ef00bd32eef2a4a7e22",
    measurementId: "G-27XG6KV0ZC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

/**
 * Uploads an image to Firebase Storage and returns the download URL.
 * @param {File} file - The image file to upload.
 * @returns {Promise<string>} - The download URL of the uploaded image.
 */
const uploadImageToFirebase = async (file: File): Promise<string> => {
    if (!file) {
        throw new Error('No file provided for upload');
    }

    // Create a reference to the storage bucket
    const storageRef = ref(storage, `images/${file.name}`);

    try {
        // Upload the file to the storage bucket
        await uploadBytes(storageRef, file);

        // Get the download URL
        const downloadURL = await getDownloadURL(storageRef);
        return downloadURL; // Return the download URL
    } catch (error) {
        console.error('Error uploading image:', error);
        throw new Error('Image upload failed');
    }
};

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
    const { color, phaseName } = router.query;
    const { id } = router.query;

    // State to manage the materials list
    const [materials, setMaterials] = useState<Material[]>([]);
    const [imageFile, setImageFile] = useState<File | null>(null); // State for image file 

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
                    setMaterials(data);
                })
                .catch(error => {
                    console.error('Error fetching materials:', error);
                });
        }
    }, [id]);

    // Toggle edit mode for a row
    const toggleEditMode = (index: number) => {
        const updatedMaterials = [...materials];
        updatedMaterials[index].isEditable = !updatedMaterials[index].isEditable;
        setMaterials(updatedMaterials);

    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const file = e.target.files?.[0] || null; // Cast to HTMLInputElement
        if (file) {
            setImageFile(file); // Set the image file state
            try {
                const imageUrl = await uploadImageToFirebase(file);
                const updatedMaterials = [...materials];
                updatedMaterials[index].imageUrl = imageUrl;// Set the image URL in the material
                setMaterials(updatedMaterials);
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }
    };


    // Update handleMaterialChange to apply to both new and existing materials
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

    // Add a new row with empty fields but make it part of `materials` state
    const addMaterial = (index: number) => {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
            console.error('User not found');
            return;
        }
        const user = JSON.parse(storedUser);
        console.log('userId got', user.id)

        const emptyMaterial: Material = {
            id: '',
            item: '',
            description: '',
            unit: '',
            quantity: 0,
            rate: 0,
            amount: 0,
            image: '',
            imageUrl: '',
            isEditable: true,
            createdBy: user?.id,
            phaseId: id as string,
        };
        const updatedMaterials = [...materials];
        updatedMaterials.splice(index + 1, 0, emptyMaterial); // Insert after the clicked row
        setMaterials(updatedMaterials);
    };

    // Function to save new material row data to API
    const saveNewMaterialRow = async (index: number) => {
        const material = materials[index];

        // Ensure all required fields are present
        if (!material.item || !material.description) {
            console.error("Please complete all required fields");
            return;
        }
        // Log the payload to check for accuracy
        console.log('Payload before sending:', material);
        const token = localStorage.getItem('token');
        const apiUrl = `${API_BASE_URL}/material-schedules/professional`;

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(material),
            });

            if (response.ok) {
                const data = await response.json();
                const updatedMaterials = [...materials];
                updatedMaterials[index] = { ...data, isEditable: false }; // Update with returned data and set to non-editable
                setMaterials(updatedMaterials);
                console.log('New material saved:', data);
            } else {
                const errorData = await response.json();
                console.error('Failed to add material:', errorData);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };


    // Remove a material row and delete 
    const removeMaterial = async (index: number) => {
        const materialToRemove = materials[index];
        if (materialToRemove.id) {
            const token = localStorage.getItem('token');
            const apiUrl = `${API_BASE_URL}/material-schedules/${materialToRemove.id}/professional`;
            await fetch(apiUrl, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to delete material');
                    }
                })
                .catch(error => {
                    console.error('Error deleting material:', error);
                });
        }
        const updatedMaterials = materials.filter((_, i) => i !== index);
        setMaterials(updatedMaterials);
    };

    // update the quantity and description.
    const saveMaterialUpdate = async (index: number) => {
        const material = materials[index];
        const token = localStorage.getItem('token');
        const apiUrl = `${API_BASE_URL}/material-schedules/${material.id}/quantity-description/professional`;

        try {
            const response = await fetch(apiUrl, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({
                    description: material.description,
                    quantity: material.quantity,
                }),
            });

            if (response.ok) {
                const updatedMaterials = [...materials];
                updatedMaterials[index].isEditable = false;
                setMaterials(updatedMaterials);
            } else {
                console.error('Failed to update material');
            }
        } catch (error) {
            console.error('Error updating material:', error);
        }
    };

    // Conditional save handler
    const handleSave = async (index: number) => {
        const material = materials[index];
        if (material.id) {
            // If the material has an ID, call saveMaterialUpdate for updating
            await saveMaterialUpdate(index);
        } else {
            // If no ID, it's a new material, so call saveNewMaterialRow
            await saveNewMaterialRow(index);
        }
    };


    // Calculate total amount
    const totalAmount = materials.reduce((total, material) => total + Number(material.amount || 0), 0);

    // color is a string. use a fallback color if it's not defined
    const phaseColor = Array.isArray(color) ? color[0] : color || theme.palette.primary.main;

    return (
        <Box p={4} position="relative">
            {/* Back arrow button for easy navigation */}
            <IconButton
                sx={{
                    position: 'fixed',
                    top: 75,
                    left: 16, // Place it on the left for easy access
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
                            <TableCell sx={{ fontWeight: 600, padding: '6px 10px', position: 'sticky', top: 0, backgroundColor: theme.palette.background.paper, zIndex: 1, color: phaseColor }}>
                                Image
                            </TableCell>
                            <TableCell sx={{ fontWeight: 600, padding: '6px 10px', position: 'sticky', top: 0, backgroundColor: theme.palette.background.paper, zIndex: 1, color: phaseColor }}>
                                Item
                            </TableCell>
                            <TableCell sx={{ fontWeight: 600, padding: '6px 10px', position: 'sticky', top: 0, backgroundColor: theme.palette.background.paper, zIndex: 1, color: phaseColor }}>
                                Description
                            </TableCell>
                            <TableCell sx={{ fontWeight: 600, padding: '6px 10px', position: 'sticky', top: 0, backgroundColor: theme.palette.background.paper, zIndex: 1, color: phaseColor }}>
                                Unit
                            </TableCell>
                            <TableCell sx={{ fontWeight: 600, padding: '6px 10px', position: 'sticky', top: 0, backgroundColor: theme.palette.background.paper, zIndex: 1, color: phaseColor }}>
                                Quantity
                            </TableCell>
                            <TableCell sx={{ fontWeight: 600, padding: '6px 10px', position: 'sticky', top: 0, backgroundColor: theme.palette.background.paper, zIndex: 1, color: phaseColor }}>
                                Rate
                            </TableCell>
                            <TableCell sx={{ fontWeight: 600, padding: '6px 10px', position: 'sticky', top: 0, backgroundColor: theme.palette.background.paper, zIndex: 1, color: phaseColor }}>
                                Amount
                            </TableCell>
                            <TableCell sx={{ fontWeight: 600, padding: '6px 10px', position: 'sticky', top: 0, backgroundColor: theme.palette.background.paper, zIndex: 1, color: phaseColor }}>
                                Actions
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {materials.map((material, index) => (
                            <TableRow key={index} sx={{ height: '20px', cursor: 'pointer' }}>
                                <TableCell sx={{ padding: '4px 8px', minWidth: 100, minHeight: 100, }}>
                                    {material.image && !material.isEditable ? (
                                        <img
                                            src={material.image}
                                            alt={`Material ${material.item}`}
                                            style={{ width: '50px', height: '50px', objectFit: 'cover' }} // Adjust size as necessary
                                        />
                                    ) : (
                                        <>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => handleImageUpload(e, index)}
                                                style={{ display: 'none' }} // Hide the default input
                                                id={`upload-${index}`}
                                            />
                                            <label htmlFor={`upload-${index}`}>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    component="span"
                                                    startIcon={<AddIcon />}
                                                >
                                                    Upload
                                                </Button>
                                            </label>
                                        </>
                                    )}
                                </TableCell>
                                <TableCell sx={{ padding: '4px 8px', minWidth: 100, minHeight: 100, }}>
                                    <TextField
                                        fullWidth
                                        variant="standard"
                                        value={material.item}
                                        onChange={(e) => handleMaterialChange(index, 'item', e.target.value)}
                                        disabled={!material.isEditable}  // Disable if not in edit mode
                                        InputProps={{
                                            disableUnderline: true,
                                        }}
                                    />
                                </TableCell>
                                <TableCell sx={{ padding: '4px 8px', minWidth: 100, minHeight: 100, }}>
                                    {material.isEditable ? (
                                        <TextField
                                            fullWidth
                                            variant="standard"
                                            value={material.description}
                                            onChange={(e) => handleMaterialChange(index, 'description', e.target.value)}
                                            disabled={!material.isEditable}
                                            InputProps={{
                                                disableUnderline: true,
                                            }}
                                        />
                                    ) : (
                                        material.description
                                    )}
                                </TableCell>
                                <TableCell sx={{ padding: '4px 8px', minWidth: 100, minHeight: 100, }}>
                                    <TextField
                                        fullWidth
                                        variant="standard"
                                        value={material.unit}
                                        onChange={(e) => handleMaterialChange(index, 'unit', e.target.value)}
                                        disabled={!material.isEditable}  // Disable if not in edit mode
                                        InputProps={{
                                            disableUnderline: true,
                                        }}
                                    />
                                </TableCell>
                                <TableCell sx={{ padding: '4px 8px', minWidth: 100, minHeight: 100, }}>
                                    {material.isEditable ? (
                                        <TextField
                                            type="number"
                                            fullWidth
                                            variant="standard"
                                            value={material.quantity}
                                            onChange={(e) => handleMaterialChange(index, 'quantity', e.target.value)}
                                            disabled={!material.isEditable}  // Disable if not in edit mode
                                            InputProps={{
                                                disableUnderline: true,
                                            }}
                                        />
                                    ) : (
                                        material.quantity
                                    )}
                                </TableCell>
                                <TableCell sx={{ padding: '4px 8px', minWidth: 100, minHeight: 100, }}>
                                    <TextField
                                        type="number"
                                        fullWidth
                                        variant="standard"
                                        value={material.rate}
                                        onChange={(e) => handleMaterialChange(index, 'rate', e.target.value)}
                                        disabled={!material.isEditable}  // Disable if not in edit mode
                                        InputProps={{
                                            disableUnderline: true,
                                        }}
                                    />
                                </TableCell>
                                <TableCell sx={{ padding: '4px 8px', minWidth: 100, minHeight: 100, }}>{material.amount}</TableCell>
                                <TableCell sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    padding: '4px 8px',
                                    flexDirection: 'column',
                                    alignItems: 'flex-start',
                                    minWidth: 100, minHeight: 100,
                                }}>
                                    <Box display="flex" flexDirection="row">
                                        <IconButton onClick={() => addMaterial(index)} color="secondary">
                                            <AddIcon />
                                        </IconButton>
                                        <IconButton onClick={() => removeMaterial(index)} color="primary">
                                            -
                                        </IconButton>
                                        {material.isEditable ? (
                                            <IconButton onClick={() => handleSave(index)} color="secondary">
                                                Save
                                            </IconButton>
                                        ) : (
                                            <IconButton onClick={() => toggleEditMode(index)}>
                                                <EditIcon />
                                            </IconButton>
                                        )}
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


