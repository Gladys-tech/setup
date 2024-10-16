import React, { useState } from 'react';
import {
    Box,
    Button,
    TextField,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const RolesPage = () => {
    const theme = useTheme();
    const [roleName, setRoleName] = useState('');
    const [roleDescription, setRoleDescription] = useState('');
    const [roles, setRoles] = useState<{ name: string; description: string }[]>([]);
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleAddOrUpdateRole = () => {
        if (editIndex !== null) {
            // Update existing role
            setRoles((prevRoles) => {
                const updatedRoles = [...prevRoles];
                updatedRoles[editIndex] = { name: roleName.trim(), description: roleDescription.trim() };
                return updatedRoles;
            });
        } else {
            // Add new role
            if (roleName.trim()) {
                setRoles((prevRoles) => [...prevRoles, { name: roleName.trim(), description: roleDescription.trim() }]);
            }
        }
        resetForm();
    };

    const resetForm = () => {
        setRoleName('');
        setRoleDescription('');
        setEditIndex(null);
        setDialogOpen(false);
    };

    const handleEditRole = (index: number) => {
        setRoleName(roles[index].name);
        setRoleDescription(roles[index].description);
        setEditIndex(index);
        setDialogOpen(true);
    };

    const handleDeleteRole = (index: number) => {
        setRoles((prevRoles) => prevRoles.filter((_, i) => i !== index));
    };

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" sx={{ mb: 2 }}>Manage Roles</Typography>

            <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setDialogOpen(true)}
                sx={{ mb: 2 }}
            >
                Add Role
            </Button>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Role Name</TableCell>
                            <TableCell>Role Description</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {roles.map((role, index) => (
                            <TableRow key={index}>
                                <TableCell>{role.name}</TableCell>
                                <TableCell>{role.description}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleEditRole(index)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleDeleteRole(index)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={dialogOpen} onClose={resetForm}>
                <DialogTitle>{editIndex !== null ? 'Edit Role' : 'Add Role'}</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Role Name"
                        variant="outlined"
                        value={roleName}
                        onChange={(e) => setRoleName(e.target.value)}
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Role Description"
                        variant="outlined"
                        value={roleDescription}
                        onChange={(e) => setRoleDescription(e.target.value)}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={resetForm} color="primary">Cancel</Button>
                    <Button onClick={handleAddOrUpdateRole} color="primary">
                        {editIndex !== null ? 'Update' : 'Add'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default RolesPage;
