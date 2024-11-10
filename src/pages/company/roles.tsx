import React, { useState, useEffect } from 'react';
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
import { API_BASE_URL } from '../api/http.api';

interface Role {
    id: number;
    roleName: string;
    roleDescription: string;
    createdBy: string;
}


const RolesPage = () => {
    const theme = useTheme();
    const [roleName, setRoleName] = useState('');
    const [roleDescription, setRoleDescription] = useState('');
    const [roles, setRoles] = useState<{ id: number; roleName: string; roleDescription: string; createdBy: string }[]>([]);
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);

    const createdBy = 'company';

    // Fetch roles when the component mounts
    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/roles/company`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) throw new Error('Failed to fetch roles');
                const data = await response.json();
                console.log("roles", data);
                setRoles(data);
            } catch (error) {
                console.error('Error fetching roles:', error);
            }
        };
        fetchRoles();
    }, []);

    const handleAddOrUpdateRole = async () => {
        if (editIndex !== null) {
            // Update existing role
            const updatedRole = {
                roleName: roleName.trim(),
                roleDescription: roleDescription.trim(),
                createdBy: createdBy
            };
            try {
                const response = await fetch(`${API_BASE_URL}/roles/${roles[editIndex].id}/company`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedRole),
                });
                if (!response.ok) throw new Error('Failed to update role');
                const updatedRoles = [...roles];
                updatedRoles[editIndex] = { ...updatedRoles[editIndex], ...updatedRole };
                setRoles(updatedRoles);
            } catch (error) {
                console.error('Error updating role:', error);
            }
        } else {
            // Add new role
            if (roleName.trim()) {
                const newRole = {
                    roleName: roleName.trim(),
                    roleDescription: roleDescription.trim(),
                    createdBy: createdBy
                };
                try {
                    const response = await fetch(`${API_BASE_URL}/roles/company`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(newRole),
                    });
                    if (!response.ok) throw new Error('Failed to add role');
                    const addedRole = await response.json();
                    console.log("Added Role:", addedRole);
                    setRoles((prevRoles) => [...prevRoles, addedRole]);
                } catch (error) {
                    console.error('Error adding role:', error);
                }
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
        setRoleName(roles[index].roleName);
        setRoleDescription(roles[index].roleDescription);
        setEditIndex(index);
        setDialogOpen(true);
    };

    const handleDeleteRole = async (index: number) => {
        try {
            const response = await fetch(`${API_BASE_URL}/roles/${roles[index].id}/company`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Failed to delete role');
            setRoles((prevRoles) => prevRoles.filter((_, i) => i !== index));
        } catch (error) {
            console.error('Error deleting role:', error);
        }
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
                            <TableCell>Created By</TableCell> {/* Added this */}
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {roles.map((role, index) => {
                            return (
                                <TableRow key={role.id}>
                                    <TableCell>{role.roleName}</TableCell>
                                    <TableCell>{role.roleDescription}</TableCell>
                                    <TableCell>{role.createdBy}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => handleEditRole(index)}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton onClick={() => handleDeleteRole(index)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Add/Update Role Dialog */}
            <Dialog open={dialogOpen} onClose={resetForm}>
                <DialogTitle>{editIndex !== null ? 'Edit Role' : 'Add Role'}</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Role Name"
                        variant="outlined"
                        fullWidth
                        value={roleName}
                        onChange={(e) => setRoleName(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Role Description"
                        variant="outlined"
                        fullWidth
                        value={roleDescription}
                        onChange={(e) => setRoleDescription(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={resetForm} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleAddOrUpdateRole} color="primary">
                        {editIndex !== null ? 'Update' : 'Add'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default RolesPage;
