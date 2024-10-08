
import React from 'react';
import { Box, Button, Table, TableBody, TableCell, TableHead, TableRow, Typography, useTheme } from '@mui/material';

const leaveRequests = [
  { type: 'Annual Leave', days: 5, start: 'Sept. 9, 2024', end: 'Sept. 13, 2024', return: 'Sept. 16, 2024', status: 'Approved' },
  { type: 'Annual Leave', days: 5, start: 'Aug. 14, 2024', end: 'Aug. 20, 2024', return: 'Aug. 21, 2024', status: 'Approved' },
  { type: 'Annual Leave', days: 5, start: 'June 10, 2024', end: 'June 14, 2024', return: 'June 17, 2024', status: 'Approved' },
  { type: 'Annual Leave', days: 5, start: 'April 8, 2024', end: 'April 12, 2024', return: 'April 15, 2024', status: 'Approved' },
];

const LeaveRequests = () => {
  const theme = useTheme(); // Get the current theme

  return (
    <Box p={3}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" color={theme.palette.text.primary}>My Leave Requests</Typography>
        <Button 
          variant="contained" 
          sx={{
            backgroundColor: theme.palette.primary.main, // Use primary color from the theme
            color: theme.palette.primary.contrastText, // Use contrast text color
            '&:hover': {
              backgroundColor: theme.palette.primary.dark, // Darker shade on hover
            },
          }}
        >
          Take Leave
        </Button>
      </Box>
      <Table sx={{ marginTop: 2 }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ backgroundColor: theme.palette.customColors.tableHeaderBg }}>TYPE</TableCell>
            <TableCell sx={{ backgroundColor: theme.palette.customColors.tableHeaderBg }}>NUMBER OF DAYS</TableCell>
            <TableCell sx={{ backgroundColor: theme.palette.customColors.tableHeaderBg }}>START DATE</TableCell>
            <TableCell sx={{ backgroundColor: theme.palette.customColors.tableHeaderBg }}>END DATE</TableCell>
            <TableCell sx={{ backgroundColor: theme.palette.customColors.tableHeaderBg }}>RETURN DATE</TableCell>
            <TableCell sx={{ backgroundColor: theme.palette.customColors.tableHeaderBg }}>STATUS</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {leaveRequests.map((leave, index) => (
            <TableRow key={index}>
              <TableCell>{leave.type}</TableCell>
              <TableCell>{leave.days}</TableCell>
              <TableCell>{leave.start}</TableCell>
              <TableCell>{leave.end}</TableCell>
              <TableCell>{leave.return}</TableCell>
              <TableCell>{leave.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default LeaveRequests;
