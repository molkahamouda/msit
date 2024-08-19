import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import useForms from "../../../hooks/useForms";
import Row from "../../../components/Row";
import './myforms.css'
const Myforms = () => {
  const { forms, deleteById } = useForms();
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/forms/createForm");
  };

  const handleCopyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "90vh",
        overflow: "hidden",
        width: "200vh",
      }}
    >
      <Box
        sx={{
          position: "sticky",
          top: 0,
          backgroundColor: "#f5f5f5",
          padding: 4,
          marginRight: 4,
          borderRadius: 4,
          borderRight: "1px solid #e0e0e0",
          height: "90vh",
          overflowY: "auto",
          minWidth: "100px",
        }}
      >
        <button
          className="btn btn-primary w-100 mb-2"
          type="button"
          onClick={handleButtonClick}
        >
          Create new form
        </button>
        <button className="btn btn-primary w-100 mb-2" type="button"></button>
      </Box>
      <TableContainer component={Paper} sx={{ width: "160vh" }}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#6488EA" }}>
              <TableCell sx={{ color: "#ffffff", fontWeight: "bold" }}>
                Name
              </TableCell>
              <TableCell sx={{ color: "#ffffff", fontWeight: "bold" }}>
                Type
              </TableCell>
              <TableCell sx={{ color: "#ffffff", fontWeight: "bold" }}>
                Fields
              </TableCell>
              <TableCell sx={{ color: "#ffffff", fontWeight: "bold" }}>
                Html Code
              </TableCell>
              <TableCell
                align="right"
                sx={{ width: "20%", color: "#ffffff", fontWeight: "bold" }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {forms.map((form, index) => (
              <Row
                key={index}
                row={form}
                onCopyToClipboard={handleCopyToClipboard}
                onDelete={deleteById}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
export default Myforms;