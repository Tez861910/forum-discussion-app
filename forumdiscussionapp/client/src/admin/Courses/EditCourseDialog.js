import * as React from "react";
import { Typography, TextField, Button, Box, Modal } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";

export function EditCourseDialog({
  open,
  handleClose,
  handleSaveEdit,
  updatedCourseName,
  setUpdatedCourseName,
  updatedCourseDescription,
  setUpdatedCourseDescription,
}) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography
          variant="h6"
          sx={{ marginBottom: 1 }}
          id="modal-modal-title"
        >
          Edit Course
        </Typography>
        <InputLabel htmlFor="modal-modal-name">Course Name:</InputLabel>
        <TextField
          type="text"
          value={updatedCourseName}
          onChange={(e) => setUpdatedCourseName(e.target.value)}
          fullWidth
          variant="outlined"
          size="small"
          id="modal-modal-name"
        />
        <InputLabel htmlFor="modal-modal-description">
          Course Description:
        </InputLabel>
        <TextField
          type="text"
          value={updatedCourseDescription}
          onChange={(e) => setUpdatedCourseDescription(e.target.value)}
          fullWidth
          variant="outlined"
          size="small"
          id="modal-modal-description"
          sx={{ marginTop: 1 }}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 1,
            marginTop: 2,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleClose}
            size="small"
            sx={{ textTransform: "none" }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleSaveEdit}
            size="small"
            sx={{ textTransform: "none" }}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
