import { Modal, Box } from "@mui/material";
import CreateOfferForm from "../../Form/CreateOfferForm/CreateOfferForm";

const CreateOfferModal = ({ 
    openModal, 
    handleCloseModal, 
    proyectId, 
}) => {

    return (
        <Modal open={openModal} onClose={handleCloseModal}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 700,
                    maxHeight: "80vh",
                    overflowY: "auto",
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                }}
            >
                <CreateOfferForm 
                    proyectId={proyectId} 
                    handleCloseModal={handleCloseModal}
                />   
            </Box>
        </Modal>
    );
};

export default CreateOfferModal;
