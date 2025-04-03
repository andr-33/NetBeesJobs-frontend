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
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                  }}
            >
                <ProfileUserForm 
                    editMode={true}
                />
            </Box>
        </Modal>
    );
};

export default ({openModal, handleCloseModal}) => (
    <ImageProfileProvider>
        <EditUserProfileModal 
            openModal={openModal} 
            handleCloseModal={handleCloseModal}
        />
    </ImageProfileProvider>
)