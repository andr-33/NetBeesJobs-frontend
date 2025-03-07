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
                p: 3,
                borderRadius: 2,
            }}>
                <Typography 
                    variant="h5"
                    align="center"
                >
                    {warningQuestion}
                </Typography>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    gap: 1,
                    my: 2,
                }}>
                    <WarningRounded color="error" />
                    <Typography 
                        variant="body1"
                        color="secondary"
                        sx={{
                            lineHeight: 1
                        }}
                    >
                        {message}
                    </Typography>
                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'space-between',
                }}>
                    <Button
                        variant="contained"
                        onClick={() => setConfirmation(true)}
                    >
                        SI
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleCloseModal}
                        color="error"
                    >
                        NO
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default WarningModal;