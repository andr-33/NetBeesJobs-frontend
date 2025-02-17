import { Button, Modal, Typography, Box } from "@mui/material";

const WarningModal = ({ message, setConfirmation, openModal, handleCloseModal }) => {
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
                <Typography variant="h5">{message}</Typography>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'space-between'
                }}>
                    <Button
                        variant="outlined"
                        onClick={() => setConfirmation(true)}
                    >
                        SI
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleCloseModal}
                    >
                        NO
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default WarningModal;