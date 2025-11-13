

// src/components/ApprovalTable.jsx
import React from "react";
import { Button } from "@mui/material";

export default function ApprovalTable({ reports, onAction }) {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr style={{ background: "#f3f4f6", textAlign: "left" }}>
          <th>Title</th>
          <th>Faculty</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {reports.map((r) => (
          <tr key={r.id} style={{ borderBottom: "1px solid #e5e7eb" }}>
            <td>{r.title}</td>
            <td>{r.faculty}</td>
            <td>{r.status}</td>
            <td>
              <Button
                variant="contained"
                color="success"
                size="small"
                onClick={() => onAction(r.id, "Approved")}
                style={{ marginRight: "8px" }}
              >
                Approve
              </Button>
              <Button
                variant="contained"
                color="error"
                size="small"
                onClick={() => onAction(r.id, "Rejected")}
              >
                Reject
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
