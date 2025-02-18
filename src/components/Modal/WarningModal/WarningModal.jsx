import { Button, Modal, Typography, Box } from "@mui/material";
import { WarningRounded } from "@mui/icons-material";

const WarningModal = ({ warningQuestion, message, setConfirmation, openModal, handleCloseModal }) => {
    return (
        <Modal
            open={openModal}
            onClose={handleCloseModal}
        >
            <Box sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                bgcolor: "background.paper",
                boxShadow: 24,
                p: 4,
                borderRadius: 2,
            }}>
                <Typography 
                    variant="h5"
                    align="center"
                >
                    {warningQuestion}
                </Typography>
                <Typography
                    variant="body1"
                    align="justify"
                    color="secondary"
                    marginTop={1} 
                >
                    <WarningRounded sx={{mr: 0.5}} />
                    {message}
                </Typography>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'space-between',
                    mt: 2
                }}>
                    <Button
                        variant="contained"
                        onClick={handleCloseModal}
                        color="error"
                    >
                        NO
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => setConfirmation(true)}
                    >
                        SI
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default WarningModal;