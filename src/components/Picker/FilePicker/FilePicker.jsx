import { CloudUploadRounded, DeleteRounded } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useRef } from "react";

const FilePicker = ({ file, setFile }) => {
  const inputFileRef = useRef(null);
  const theme = useTheme();

  const handleOpenFilePicker = () => {
    inputFileRef.current.click();
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFile({
          file: selectedFile,
          dataURL: e.target.result
        });
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleDeleteFile = () => {
    setFile(null);
    if (inputFileRef.current) {
      inputFileRef.current.value = "";
    }
  };

  return (
    <Box>
      {file ? (
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 2,
          p: 1,
          border: '1px solid',
          borderColor: theme.palette.divider,
          borderRadius: 2
        }}>
          <Typography variant="body1">
            {file.file.name}
          </Typography>
          <IconButton 
            onClick={handleDeleteFile}
            color="error"
            sx={{ ml: 'auto' }}
          >
            <DeleteRounded />
          </IconButton>
        </Box>
      ) : (
        <Box
          component={'div'}
          onClick={handleOpenFilePicker}
          sx={{
            width: '100%',
            height: '80px',
            py: 4,
            border: '1px dashed #AAAD',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: 2,
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: theme.palette.action.hover
            }
          }}
        >
          <CloudUploadRounded
            sx={{
              animation: 'bounce 1s infinite',
              fontSize: '40px',
              color: theme.palette.primary.main,
              mb: 1
            }}
          />
          <Typography variant="body2">
            Haz clic para seleccionar un archivo
          </Typography>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            hidden
            ref={inputFileRef}
          />
        </Box>
      )}
    </Box>
  );
};

export default FilePicker;