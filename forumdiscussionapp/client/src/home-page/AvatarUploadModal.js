import * as React from 'react';
import { Button, Modal, Box, Typography, Stack, TextField } from '@mui/material';
import { styled } from '@mui/system';
import useApi from './Api';

const Input = styled('input')({
  display: 'none',
});

const AvatarUploadModal = ({ isOpen, onRequestClose }) => {
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [fileName, setFileName] = React.useState('');
  const api = useApi();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setFileName(event.target.files[0].name);
  };

  const handleUploadClick = () => {
    const formData = new FormData();
    formData.append('avatar', selectedFile);
  
    // Get userId from local storage
    const userId = localStorage.getItem('userId');
    formData.append('userId', userId);
  
    api.post('/home/upload-avatar', formData)
      .then((response) => {
        console.log(response.data);
        onRequestClose();
      })
      .catch((error) => {
        console.error(error);
      });
  };
  

  return (
    <Modal open={isOpen} onClose={onRequestClose}>
      <Box sx={{ p: 2, width: 300, bgcolor: 'background.paper', borderRadius: 2, m: 'auto', mt: 10 }}>
        <Typography variant="h6" component="div" gutterBottom>
          Upload Avatar
        </Typography>
        <Stack direction="column" spacing={2}>
          <label htmlFor="contained-button-file">
            <Input accept="image/*" id="contained-button-file" type="file" onChange={handleFileChange} />
            <Button variant="contained" component="span">
              Select File
            </Button>
          </label>
          <TextField
            fullWidth
            variant="outlined"
            disabled
            value={fileName}
            label="Selected File"
          />
          <Button variant="contained" color="primary" onClick={handleUploadClick}>
            Upload
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default AvatarUploadModal;
