import { DeleteRounded } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";

const FilePicker = () => {
    const [file, setFile] = useState();

    const handleUploadFile = async () => {
        try {
            const response = await axios.post();
        } catch (error) {

        }
    };


    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setFile(e.target.result);
                console.log(e.target.result);
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
                <Box>
                    <input
                        type="file"
                        accept="application/pdf"
                        onChange={handleFileChange}
                        hidden
                    />
                </Box>
            )}

        </Box>
    );
};

export default FilePicker;