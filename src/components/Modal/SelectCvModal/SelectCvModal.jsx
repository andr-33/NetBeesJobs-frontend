import {
    Modal,
    Box,
    Typography,
    List,
    Button,
    useTheme,
    IconButton
} from "@mui/material";
import { CloseRounded } from "@mui/icons-material";
import { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext/AuthContext";
import FilePicker from "../../Picker/FilePicker/FilePicker";
import CvFileItem from "../../ListItem/CvFileItem/CvFileItem";
import axios from "axios";

const SelectCvModal = ({
    openModal,
    handleCloseModal,
    cvFilesData,
    isLoading,
    availableToUpload,
    setAvailableToUpload
}) => {
    const [file, setFile] = useState();
    const theme = useTheme();
    const { accessToken } = useAuth();

    const handleUploadFile = async () => {
        try {
            const response = await axios.post('/api/users/upload-cv-file', {
                "file": file
            }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });

            console.log("File uploaded:", response.data);
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };

    return (
        <Modal
            open={openModal}
            onClose={handleCloseModal}
            aria-labelledby="cv-modal-title"
            aria-describedby="cv-modal-description"
        >
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 450,
                    bgcolor: theme.palette.background.paper,
                    px: 2,
                    pt: 1,
                    pb: 2,
                    borderRadius: 2,
                }}
            >
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'end',
                }}>
                    <IconButton
                        size="small"
                        onClick={() => {
                            handleCloseModal();
                            setFile(null);
                        }}
                    >
                        <CloseRounded />
                    </IconButton>
                </Box>
                <Typography id="cv-modal-title" variant="h6" sx={{ mb: 2 }}>
                    Selecciona tu CV
                </Typography>

                {isLoading && (
                    <Typography>Cargando CVs...</Typography>
                )}

                {cvFilesData.length > 0 && !availableToUpload && (
                    <List sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1
                    }}>
                        {cvFilesData.map((cv, index) => (
                            <CvFileItem
                                key={index}
                                fileName={cv.nombre}
                                uploadDate={cv.fecha}
                            />
                        ))}
                    </List>
                )}

                {availableToUpload && (
                    <FilePicker
                        file={file}
                        setFile={setFile}
                    />
                )}

                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    mt: 2,
                    width: '100%',
                    justifyContent: 'end'
                }}>
                    {availableToUpload ? (
                        <Button
                            variant="contained"
                            onClick={handleUploadFile}
                            disabled={!file}
                        >
                            Subir este archivo
                        </Button>
                    ) : (
                        <Button
                            variant="contained"
                            onClick={() => setAvailableToUpload(true)}
                        >
                            Agregar CV
                        </Button>
                    )}

                </Box>
            </Box>
        </Modal>
    );
};

export default SelectCvModal;