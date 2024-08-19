// components/Row.js
import React, { useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const Row = ({ row, onCopyToClipboard, onDelete }) => {
  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <TableRow
        sx={{
          "& > *": { borderBottom: "unset" },
          backgroundColor: "#f4f6fd",
        }}
      >
        <TableCell component="th" scope="row"></TableCell>
        <TableCell>{row.typeForm}</TableCell>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <Badge badgeContent={row.fields.length} color="secondary">
                <TextFieldsIcon color="action" />
              </Badge>
            ) : (
              <Badge badgeContent={row.fields.length} color="primary">
                <TextFieldsIcon color="action" />
              </Badge>
            )}
          </IconButton>
        </TableCell>
        <TableCell>
          <button
            className="btn btn-primary w-100"
            type="button"
            onClick={() => onCopyToClipboard(row.generatedHtml)}
          >
            Copy to Clipboard
          </button>
        </TableCell>
        <TableCell align="right">
          <button className="btn btn-primary w-10 mb-2" type="button">
            <EditIcon />
          </button>
          <button
            className="btn btn-primary w-10"
            type="button"
            onClick={() => onDelete(row._id)}
          >
            <DeleteIcon />
          </button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography
                variant="h6"
                gutterBottom
                component="div"
                sx={{ color: "#6488EA" }}
              >
                Fields
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                    <TableCell sx={{ fontWeight: "bold", color: "#6488EA" }}>
                      type
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", color: "#6488EA" }}>
                      label
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ fontWeight: "bold", color: "#6488EA" }}
                    >
                      placeholder
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ fontWeight: "bold", color: "#6488EA" }}
                    >
                      options
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.fields.map((fieldsRow) => (
                    <TableRow key={fieldsRow.type}>
                      <TableCell component="th" scope="row">
                        {fieldsRow.type}
                      </TableCell>
                      <TableCell>{fieldsRow.label}</TableCell>
                      <TableCell align="right">
                        {fieldsRow.placeholder}
                      </TableCell>
                      <TableCell align="right">
                        {Array.isArray(fieldsRow.options)
                          ? fieldsRow.options.join(", ")
                          : "N/A"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

Row.propTypes = {
  row: PropTypes.shape({
    typeForm: PropTypes.string.isRequired,
    fields: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        placeholder: PropTypes.string,
        options: PropTypes.array,
      })
    ).isRequired,
  }).isRequired,
  onCopyToClipboard: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Row;
