import { useState, useEffect } from "react";
import { Box, FormControl, FormControlLabel, InputLabel, Switch, Typography } from "@mui/material";
import { useAuth } from "../../../contexts/AuthContext/AuthContext";
import { useNotification } from "../../../contexts/NotificationContext/NotificationContext";
import CustomTextFieldWithIcon from "../../TextField/CustomTextFieldWithIcon/CustomTextFieldWithIcon";
import CustomDatePicker from "../../Picker/CustomDatePicker/CustomDatePicker";
import LoaderButton from "../../Button/LoaderButton/LoaderButton";
import axios from "axios";
import dayjs from "dayjs";

const INITIAL_VALUES = {
    nombre: "",
    descripcion: "",
    fecha_inicio: null,
    fecha_fin: null,
    estado: 1
};

const CreateProjectForm = ({
    setProjectsData,
    handleCloseModal,
    projectId,
    editMode
}) => {
    const [formValues, setFormValues] = useState(INITIAL_VALUES);
    const [loading, setLoading] = useState(false);
    const { accessToken } = useAuth();
    const { updateNotification, openNotification } = useNotification();

    const handleOnChange = (event) => {
        const { name, value } = event.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));
    };

    const handleDateChange = (name) => (date) => {
        if (!date) return;
        
        setFormValues((prev) => ({ ...prev, [name]: date.format("YYYY-MM-DD") }));
    };

    const handleStateChange = (event) => {
        setFormValues((prev) => ({...prev, estado: event.target.checked ? 1 : 0}));
    };

    const handleSubmitCreate = async (event) => {
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

    const handleSubmitUpdate = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            const response = await axios.put(`/api/companies/update-project/${projectId}`, formValues);
            const updatedRecord = response.data;
            setProjectsData((prev)=>
                prev.map((project)=>
                    project.emp_proyectos_id === projectId ? { ...project, ...updatedRecord } : project
                )
            );
            updateNotification("Proyecto actualizado con exito", "success");
            openNotification();
            handleCloseModal();
        } catch (error) {
            console.error("Error al actualizar el proyecto:", error);
            updateNotification("Ocurrió un error al actualizar el proyecto. Inténtalo de nuevo", "error");
            openNotification();
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchProjectData = async () => {
            try {
                const response = await axios.get(`/api/companies/project-info/${projectId}`);
                setFormValues(response.data[0])
            } catch (error) {
                updateNotification('Ups... no pudimos obtener estos datos', 'error');
                openNotification();
                console.error(error);
            }
        };

        if (editMode) fetchProjectData();
    }, []);

    return (
        <Box
            component="form"
            onSubmit={editMode ? handleSubmitUpdate : handleSubmitCreate}
        >
            <Typography variant="h6" sx={{ mb: 2 }}>
                {editMode ? "Editemos tu proyecto" : "Crear Nuevo Proyecto"}
            </Typography>

            <Box sx={{
                display: 'flex',
                width: '100%',
                gap: 1
            }}>
                <CustomTextFieldWithIcon
                    label="Nombre del Proyecto"
                    name="nombre"
                    value={formValues.nombre}
                    onChange={handleOnChange}
                    required
                />

                {editMode && (
                    <FormControl
                        variant="filled"
                        sx={{
                            px: 2,
                            mb: 2,
                            display: 'flex',
                            justifyContent: 'center',
                            borderRadius: 1,
                            border: '1px solid #AAAD'
                        }}
                    >
                        <FormControlLabel 
                            control={
                                <Switch 
                                    checked={formValues.estado === 1}
                                    onChange={handleStateChange}
                                />
                            }
                            label="Estado"
                        />
                    </FormControl>
                )}
            </Box>

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
                value={dayjs(formValues.fecha_inicio)}
            />

            <CustomDatePicker
                label="Fecha de Fin"
                onChangeDate={handleDateChange("fecha_fin")}
                value={dayjs(formValues.fecha_fin)}
            />

            <LoaderButton
                text={editMode ? "Actualizar" : "Crear Proyecto"}
                loading={loading}
                sx={{ mt: 2 }}
            />
        </Box>
    );
};

export default CreateProjectForm;