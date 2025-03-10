import { Modal, Box } from "@mui/material";
import CreateProjectForm from "../../Form/CreateProjectForm/CreateProjectForm";

const CreateProjectModal = ({ openModal, handleCloseModal, setProjectsData }) => {
 
  return (
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
        <CreateProjectForm 
          setProjectsData={setProjectsData} 
          handleCloseModal={handleCloseModal} 
        />
      </Box>
    </Modal>
  );
};

export default CreateProjectModal;