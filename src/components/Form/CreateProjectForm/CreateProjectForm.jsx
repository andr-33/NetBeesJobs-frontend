import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { useAuth } from "../../../contexts/AuthContext/AuthContext";
import { useNotification } from "../../../contexts/NotificationContext/NotificationContext";
import CustomTextFieldWithIcon from "../../TextField/CustomTextFieldWithIcon/CustomTextFieldWithIcon";
import CustomDatePicker from "../../Picker/CustomDatePicker/CustomDatePicker";
import LoaderButton from "../../Button/LoaderButton/LoaderButton";
import axios from "axios";

const INITIAL_VALUES = {
    nombre: "",
    descripcion: "",
    fecha_inicio: null,
    fecha_fin: null,
};

const CreateProjectForm = ({ setProjectsData, handleCloseModal }) => {
    const [formValues, setFormValues] = useState(INITIAL_VALUES);
    const [loading, setLoading] = useState(false);
    const { accessToken } = useAuth();
    const { updateNotification, openNotification } = useNotification();

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

        try {
            const response = await axios.post("/api/companies/create-project", formValues, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            updateNotification(response.data.message, "success");
            openNotification();
            setProjectsData((prev) => [...prev, response.data.project]);
        } catch (error) {
            console.error("Error al crear el proyecto:", error);
            updateNotification("Ocurrió un error al crear el proyecto. Inténtalo de nuevo", "error");
            openNotification();
        } finally {
            setLoading(false);
            setFormValues(INITIAL_VALUES);
            handleCloseModal();
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
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
        </Box>
    );
};

export default CreateProjectForm;