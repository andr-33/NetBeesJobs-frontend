import { useState } from "react";
import { Modal, Box, Typography } from "@mui/material";
import CustomTextFieldWithIcon from "../../TextField/CustomTextFieldWithIcon/CustomTextFieldWithIcon";
import CustomDatePicker from "../../Picker/CustomDatePicker/CustomDatePicker";
import LoaderButton from "../../Button/LoaderButton/LoaderButton";
import axios from "axios";
import { useAuth } from "../../../contexts/AuthContext/AuthContext";

const INITIAL_VALUES = {
  nombre: "",
  descripcion: "",
  fecha_inicio: null,
  fecha_fin: null,
};

const CreateProjectModal = ({ openModal, handleCloseModal, setProjectsData }) => {
  const { accessToken } = useAuth();
  const [formValues, setFormValues] = useState(INITIAL_VALUES);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (name) => (date) => {
    setFormValues((prev) => ({ ...prev, [name]: date.format("YYYY-MM-DD") }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("/api/companies/create-project", formValues, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setProjectsData((prev) => [...prev, response.data]);
      setFormValues(INITIAL_VALUES);
      handleCloseModal();
    } catch (error) {
      console.error("Error al crear el proyecto:", error);
      setError(
        error.response?.data?.error || "Ocurrió un error. Inténtalo de nuevo."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={openModal} onClose={handleCloseModal}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          Crear Nuevo Proyecto
        </Typography>

        <CustomTextFieldWithIcon
          label="Nombre del Proyecto"
          name="nombre"
          value={formValues.nombre}
          onChange={handleOnChange}
          required
        />

        <CustomTextFieldWithIcon
          label="Descripción"
          name="descripcion"
          value={formValues.descripcion}
          onChange={handleOnChange}
          required
          multiline
          rows={5}
        />

        <CustomDatePicker
          label="Fecha de Inicio"
          onChangeDate={handleDateChange("fecha_inicio")}
        />

        <CustomDatePicker
          label="Fecha de Fin"
          onChangeDate={handleDateChange("fecha_fin")}
        />

        <LoaderButton text="Crear Proyecto" loading={loading} sx={{ mt: 2 }} />

        {error && (
          <Typography variant="body2" color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
      </Box>
    </Modal>
  );
};

export default CreateProjectModal;