import { Box, Modal } from "@mui/material";
import ProfileUserForm from "../../Form/ProfileUserForm/ProfileUserForm";
import { ImageProfileProvider } from "../../../contexts/ImageProfileContext/ImageProfileContext";


const EditUserProfileModal = ({openModal, handleCloseModal}) => {
    return(
        <Modal open={openModal} onClose={handleCloseModal}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 700,
                    maxHeight: "90vh",
                    overflowY: "auto",
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    px: 4,
                    py: 2,
                    borderRadius: 2,
                  }}
            >
                <ProfileUserForm 
                    editMode={true}
                    handleCloseModal={handleCloseModal}
                />
            </Box>
        </Modal>
    );
};

const EditUserProfileModalWrapper = ({ openModal, handleCloseModal }) => (
    <ImageProfileProvider>
        <EditUserProfileModal 
            openModal={openModal} 
            handleCloseModal={handleCloseModal}
        />
    </ImageProfileProvider>
);

export default EditUserProfileModalWrapper;