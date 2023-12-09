import * as React from 'react';
import { Typography, TextField, Button, Box, Modal } from '@mui/material';

function CreateCourseSection({ handleCreateCourse, newCourseName, setNewCourseName }) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSave = () => {
    handleCreateCourse();
    handleClose();
  };

  return (
    <>
      <Button variant="contained" color="secondary" sx={{ marginBottom: 2 }} onClick={handleOpen}>
        Create 
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ 
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
         }}>
          <Typography variant="h6" sx={{ marginBottom: 1 }} id="modal-modal-title">
            Create Course
          </Typography>
          <TextField
            type="text"
            label="Course Name"
            variant="outlined"
            fullWidth
            value={newCourseName}
            onChange={(e) => setNewCourseName(e.target.value)}
            size="small"
            sx={{ marginBottom: 1 }}
            id="modal-modal-description"
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleClose}
              size="small"
              sx={{ textTransform: 'none' }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleSave}
              size="small"
              sx={{ textTransform: 'none' }}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default React.memo(CreateCourseSection);
