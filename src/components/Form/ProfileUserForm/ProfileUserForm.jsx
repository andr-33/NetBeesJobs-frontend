import { Box, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import CustomTextFieldWithIcon from "../../TextField/CustomTextFieldWithIcon/CustomTextFieldWithIcon";
import LoaderButton from "../../Button/LoaderButton/LoaderButton";

const INITIAL_VALUES = {
  nombre: "",
  primer_apellido: "",
  segundo_apellido: "",
};

const ProfileUserForm = () => {
  const [formValues, setFormValues] = useState(INITIAL_VALUES);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const theme = useTheme();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("/api/user", formValues);
      console.log("User created:", response.data);
    } catch (error) {
      console.error("Error creating user:", error);
      setError(
        error.response?.data?.error ||
        "Ups... algo ha salido mal, intentalo nuevamente"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <CustomTextFieldWithIcon
        label="Nombre"
        name="nombre"
        value={formValues.nombre}
        onChange={handleOnChange}
        required
      />
      <CustomTextFieldWithIcon
        label="Primer Apellido"
        name="primer_apellido"
        value={formValues.primer_apellido}
        onChange={handleOnChange}
        required
      />
      <CustomTextFieldWithIcon
        label="Segundo Apellido"
        name="segundo_apellido"
        value={formValues.segundo_apellido}
        onChange={handleOnChange}
        required
      />
      <LoaderButton text="Crear perfil" loading={loading} />
      {error && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
          <Typography
            variant="body1"
            textAlign="center"
            sx={{ color: theme.palette.error.main }}
          >
            {error}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ProfileUserForm;
