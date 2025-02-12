import { CloudUploadRounded, DeleteRounded } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import { useRef } from "react";

const FilePicker = ({ file, setFile }) => {
    const inputFileRef = useRef(null);
    
    const handleOpenFilePicker = () => {
        inputFileRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setFile(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDeleteFile = () => {
        setFile(null);
    };

    return (
        <Box>
            {file ? (
                <Box>
                    <Typography>{file?.name}</Typography>

                    <IconButton onClick={handleDeleteFile}>
                        <DeleteRounded />
                    </IconButton>

                </Box>
            ) : (
                <Box 
                    component={'div'}
                    onClick={handleOpenFilePicker}
                    sx={{
                        width: '100%',
                        py: 4,
                        border: '1px dashed #AAAD',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        borderRadius: 2,
                        cursor: 'pointer'
                    }}
                >
                    <CloudUploadRounded
                        sx={{
                            animation: 'bounce 1s infinite',
                            fontSize: '40px'
                        }}
                    />
                    <Typography variant="caption">Haz clic para seleccionar un archivo</Typography>
                    <Typography variant="caption">O, si lo prefieres, arrástralo y suéltalo acá</Typography>

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