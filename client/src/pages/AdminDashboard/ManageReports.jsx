


// src/pages/AdminDashboard/ManageReports.jsx
import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableRow, Button, Typography, Box } from "@mui/material";

const ManageReports = () => {
  const [reports, setReports] = useState([
    { id: 1, name: "FDP on AI", faculty: "Dr. Anusha", status: "Pending" },
    { id: 2, name: "Workshop on ML", faculty: "Prof. Rao", status: "Pending" },
  ]);

  const handleApprove = (id) => {
    setReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "Approved" } : r))
    );
  };

  const handleReject = (id) => {
    setReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "Rejected" } : r))
    );
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
        Review Reports
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Report Name</TableCell>
            <TableCell>Faculty</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reports.map((report) => (
            <TableRow key={report.id}>
              <TableCell>{report.name}</TableCell>
              <TableCell>{report.faculty}</TableCell>
              <TableCell>{report.status}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="success"
                  sx={{ mr: 1 }}
                  onClick={() => handleApprove(report.id)}
                >
                  Approve
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleReject(report.id)}
                >
                  Reject
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default ManageReports;
