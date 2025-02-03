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
import FilePicker from "../../Picker/FilePicker/FilePicker";
import CvFileItem from "../../ListItem/CvFileItem/CvFileItem";

const SelectCvModal = ({ 
    openModal, 
    handleCloseModal, 
    cvFilesData, 
    isLoading, 
    availableToUpload,  
    setAvailableToUpload
}) => {
    const theme = useTheme();

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
                        onClick={handleCloseModal}
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
                    <FilePicker />
                )}

                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    mt: 2,
                    width: '100%',
                    justifyContent: 'end'
                }}>
                    <Button
                        variant="contained"
                        onClick={()=> setAvailableToUpload(true)}
                    >
                        Subir CV
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default SelectCvModal;