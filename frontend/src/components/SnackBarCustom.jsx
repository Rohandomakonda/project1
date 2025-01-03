import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function CustomizedSnackbars({ open, onClose, alertM, type }) {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
      <Alert
        onClose={onClose}
        severity={type === "success" ? "success" : "error"}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {alertM}
      </Alert>
    </Snackbar>
  );
}
