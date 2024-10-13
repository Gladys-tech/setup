// import { useRouter } from 'next/router';
// import { useState } from 'react';
// import {
//     Box,
//     Typography,
//     Button,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     TextField,
//     IconButton,
//     Paper,
//     useTheme,
//     MenuItem,
//     Select,
// } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
// import AddIcon from '@mui/icons-material/Add';

// // Define the Material interface
// interface Material {
//     item: string;
//     description: string;
//     unit: string;
//     quantity: number;
//     rate: number;
//     amount: number;
// }

// // Define the item types, their corresponding descriptions, and rates
// const itemDescriptions: { [key: string]: { description: string; rate: number }[] } = {
//     'Cement': [
//         { description: 'Simba', rate: 10 },
//         { description: 'Tororo', rate: 12 },
//         { description: 'Hima', rate: 11 },
//     ],
//     'Sand': [
//         { description: 'Lake Sand', rate: 15 },
//         { description: 'River Sand', rate: 18 },
//     ],
//     'Steel Rods': [
//         { description: 'Reinforced Steel', rate: 200 },
//         { description: 'Mild Steel', rate: 180 },
//     ],
// };

// const MaterialSchedule = () => {
//     const theme = useTheme();
//     const router = useRouter();
//     const { phase } = router.query;

//     // State to manage the materials list with initial data
//     const [materials, setMaterials] = useState<Material[]>([
//         { item: 'Cement', description: 'Simba', unit: 'Bags', quantity: 50, rate: 10, amount: 500 },
//         { item: 'Steel Rods', description: 'Reinforced Steel', unit: 'Tons', quantity: 5, rate: 200, amount: 1000 },
//         { item: 'Sand', description: 'Lake Sand', unit: 'Cubic meters', quantity: 20, rate: 15, amount: 300 },
//     ]);

//     // Handle input changes for a material
//     const handleMaterialChange = (index: number, field: keyof Material, value: string | number) => {
//         const numericValue = (field === 'quantity' || field === 'rate') ? Number(value) : value;

//         const updatedMaterials = [...materials];
//         updatedMaterials[index] = {
//             ...updatedMaterials[index],
//             [field]: numericValue,
//             amount: (field === 'quantity' || field === 'rate')
//                 ? (typeof updatedMaterials[index].quantity === 'number' ? updatedMaterials[index].quantity : 0) * (typeof numericValue === 'number' ? numericValue : 0)
//                 : updatedMaterials[index].amount,
//         };
//         setMaterials(updatedMaterials);
//     };

//     // Update rate when description is changed
//     const handleDescriptionChange = (index: number, description: string) => {
//         const updatedMaterials = [...materials];
//         const selectedItem = itemDescriptions[updatedMaterials[index].item]?.find(item => item.description === description);

//         updatedMaterials[index] = {
//             ...updatedMaterials[index],
//             description,
//             rate: selectedItem ? selectedItem.rate : 0,
//             amount: updatedMaterials[index].quantity * (selectedItem ? selectedItem.rate : 0),
//         };

//         setMaterials(updatedMaterials);
//     };

//     // Add an empty row for a new material below the clicked row
//     const addMaterial = (index: number) => {
//         const newMaterial = { item: '', description: '', unit: '', quantity: 0, rate: 0, amount: 0 };
//         const updatedMaterials = [...materials];
//         updatedMaterials.splice(index + 1, 0, newMaterial); // Insert new material below the clicked row
//         setMaterials(updatedMaterials);
//     };

//     // Remove a material row
//     const removeMaterial = (index: number) => {
//         const updatedMaterials = materials.filter((_, i) => i !== index);
//         setMaterials(updatedMaterials);
//     };

//     // Calculate total amount
//     const totalAmount = materials.reduce((total, material) => total + material.amount, 0);

//     return (
//         <Box p={4} position="relative">
//             <Typography variant="h5">
//                 Material Schedule for{' '}
//                 <span style={{ color: theme.palette.primary.main, fontWeight: 'bold' }}>{phase}</span>
//             </Typography>

//             <TableContainer component={Paper} sx={{ boxShadow: 3, overflowX: 'auto', minWidth: 300, maxHeight: 380, overflowY: 'auto' }}>
//                 <Table stickyHeader aria-label="simple table" sx={{ borderCollapse: 'collapse' }}>
//                     <TableHead>
//                         <TableRow>
//                             <TableCell sx={{ fontWeight: 600, padding: '6px 10px', position: 'sticky', top: 0, backgroundColor: theme.palette.background.paper, zIndex: 1 }}>
//                                 Item
//                             </TableCell>
//                             <TableCell sx={{ fontWeight: 600, padding: '6px 10px', position: 'sticky', top: 0, backgroundColor: theme.palette.background.paper, zIndex: 1 }}>
//                                 Description
//                             </TableCell>
//                             <TableCell sx={{ fontWeight: 600, padding: '6px 10px', position: 'sticky', top: 0, backgroundColor: theme.palette.background.paper, zIndex: 1 }}>
//                                 Unit
//                             </TableCell>
//                             <TableCell sx={{ fontWeight: 600, padding: '6px 10px', position: 'sticky', top: 0, backgroundColor: theme.palette.background.paper, zIndex: 1 }}>
//                                 Quantity
//                             </TableCell>
//                             <TableCell sx={{ fontWeight: 600, padding: '6px 10px', position: 'sticky', top: 0, backgroundColor: theme.palette.background.paper, zIndex: 1 }}>
//                                 Rate
//                             </TableCell>
//                             <TableCell sx={{ fontWeight: 600, padding: '6px 10px', position: 'sticky', top: 0, backgroundColor: theme.palette.background.paper, zIndex: 1 }}>
//                                 Amount
//                             </TableCell>
//                             <TableCell sx={{ fontWeight: 600, padding: '6px 10px', position: 'sticky', top: 0, backgroundColor: theme.palette.background.paper, zIndex: 1 }}>
//                                 Actions
//                             </TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {materials.map((material, index) => (
//                             <TableRow key={index} sx={{ height: '20px', cursor: 'pointer' }}>
//                                 <TableCell sx={{ padding: '4px 8px' }}>
//                                     <TextField
//                                         fullWidth
//                                         variant="standard"
//                                         value={material.item}
//                                         onChange={(e) => handleMaterialChange(index, 'item', e.target.value)}
//                                         InputProps={{
//                                             disableUnderline: true,
//                                         }}
//                                     />
//                                 </TableCell>
//                                 <TableCell sx={{ padding: '4px 8px' }}>
//                                     <Select
//                                         fullWidth
//                                         variant="standard"
//                                         value={material.description}
//                                         onChange={(e) => handleDescriptionChange(index, e.target.value)}
//                                         inputProps={{
//                                             disableUnderline: true,
//                                         }}
//                                     >
//                                         {itemDescriptions[material.item]?.map(item => (
//                                             <MenuItem key={item.description} value={item.description}>
//                                                 {item.description}
//                                             </MenuItem>
//                                         ))}
//                                     </Select>
//                                 </TableCell>
//                                 <TableCell sx={{ padding: '4px 8px' }}>
//                                     <TextField
//                                         fullWidth
//                                         variant="standard"
//                                         value={material.unit}
//                                         onChange={(e) => handleMaterialChange(index, 'unit', e.target.value)}
//                                         InputProps={{
//                                             disableUnderline: true,
//                                         }}
//                                     />
//                                 </TableCell>
//                                 <TableCell sx={{ padding: '4px 8px' }}>
//                                     <TextField
//                                         type="number"
//                                         fullWidth
//                                         variant="standard"
//                                         value={material.quantity}
//                                         onChange={(e) => handleMaterialChange(index, 'quantity', e.target.value)}
//                                         InputProps={{
//                                             disableUnderline: true,
//                                         }}
//                                     />
//                                 </TableCell>
//                                 <TableCell sx={{ padding: '4px 8px' }}>
//                                     <TextField
//                                         type="number"
//                                         fullWidth
//                                         variant="standard"
//                                         value={material.rate}
//                                         onChange={(e) => handleMaterialChange(index, 'rate', e.target.value)}
//                                         InputProps={{
//                                             disableUnderline: true,
//                                         }}
//                                     />
//                                 </TableCell>
//                                 <TableCell sx={{ padding: '4px 8px' }}>{material.amount}</TableCell>
//                                 <TableCell sx={{
//                                     display: 'flex',
//                                     justifyContent: 'center',
//                                     padding: '4px 8px',
//                                     flexDirection: 'column',
//                                     alignItems: 'flex-start',
//                                 }}>
//                                     <Box display="flex" flexDirection="row">
//                                         <IconButton onClick={() => addMaterial(index)} color="primary">
//                                             <AddIcon />
//                                         </IconButton>
//                                         <IconButton onClick={() => removeMaterial(index)} color="secondary">
//                                             <DeleteIcon />
//                                         </IconButton>
//                                     </Box>
//                                 </TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </TableContainer>

//             {/* Total Amount Display */}
//             <Box display="flex" justifyContent="flex-end" mt={2}>
//                 <Typography variant="h6">
//                     Total Amount: {totalAmount}
//                 </Typography>
//             </Box>
//         </Box>
//     );
// };

// export default MaterialSchedule;


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
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

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
                                <TableCell sx={{ padding: '4px 8px' }}>
                                    <TextField
                                        fullWidth
                                        variant="standard"
                                        value={material.description}
                                        onChange={(e) => handleMaterialChange(index, 'description', e.target.value)}
                                        InputProps={{
                                            disableUnderline: true,
                                        }}
                                    />
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
                                        <IconButton onClick={() => addMaterial(index)} color="primary">
                                            <AddIcon />
                                        </IconButton>
                                        <IconButton onClick={() => removeMaterial(index)} color="secondary">
                                            {/* <DeleteIcon /> */}
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
