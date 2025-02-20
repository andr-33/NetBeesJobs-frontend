import { useState } from "react";
import { Modal, Box, Typography } from "@mui/material";
import CustomTextFieldWithIcon from "../../TextField/CustomTextFieldWithIcon/CustomTextFieldWithIcon";
import OptionPicker from "../../Picker/OptionPicker/OptionPicker";
import LoaderButton from "../../Button/LoaderButton/LoaderButton";
import axios from "axios";
import { LinkedIn } from "@mui/icons-material";

const INITIAL_VALUES = {
    name: "",
    description: "",
    offer_link: "",
    salary: 0,
    job_id: "",
    sector_id: "",
    community_id: 7,
    province_id: 28,
    city_id: "",
    project_id: 0,
    created_at: null
};

const CreateOfferModal = ({ 
    openModal, 
    handleCloseModal, 
    proyectId, 
    setNotification, 
    setMessage, 
    setNotificationType 
}) => {
    const [formValues, setFormValues] = useState(INITIAL_VALUES);
    const [loading, setLoading] = useState(false);

    const handleOnChange = (event) => {
        const { name, value } = event.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        formValues.project_id = proyectId;
        formValues.salary = parseInt(formValues.salary);
        formValues.created_at = new Date();

        try {
            const response = await axios.post("/api/companies/create-offer-in-project", formValues);
            setMessage(response.data.message);
            setNotification(true);
            setNotificationType('success');
        } catch (error) {
            console.error("Error al crear la oferta:", error);
            setNotification("Ocurrió un error. Inténtalo de nuevo");
            setNotification(true);
            setNotificationType('error');
        } finally {
            setLoading(false);
            setFormValues(INITIAL_VALUES);
            handleCloseModal();
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
                    maxHeight: "80vh",
                    overflowY: "auto",
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                }}
            >
                <Typography variant="h6" sx={{ mb: 1 }}>
                    Crear Nueva Oferta de Empleo
                </Typography>

                <CustomTextFieldWithIcon
                    label="Nombre de la Oferta"
                    name="name"
                    value={formValues.name}
                    onChange={handleOnChange}
                    required
                />

                <CustomTextFieldWithIcon
                    label="Descripción"
                    name="description"
                    value={formValues.description}
                    onChange={handleOnChange}
                    required
                    multiline
                    rows={5}
                />

                <CustomTextFieldWithIcon
                    label="Salario Anual (€)"
                    name="salary"
                    type="number"
                    value={formValues.salary}
                    onChange={handleOnChange}
                    required
                />

                <CustomTextFieldWithIcon
                    label="Link de la Oferta (LinkedIn)"
                    name="offer_link"
                    value={formValues.offer_link}
                    onChange={handleOnChange}
                    icon={LinkedIn}
                />

                <Typography variant="h6" sx={{ mb: 1 }}>
                    Detalles de la Oferta
                </Typography>

                <OptionPicker
                    urlData="/api/master/job-positions"
                    label="Puesto"
                    name="job_id"
                    value={formValues.job_id}
                    onChange={handleOnChange}
                    idKey="mst_puestos_id"
                    labelKey="nombre"
                />

                <OptionPicker
                    urlData="/api/master/sectors"
                    label="Sector"
                    name="sector_id"
                    value={formValues.sector_id}
                    onChange={handleOnChange}
                    idKey="mst_emp_sector_id"
                    labelKey="descripcion"
                />

                <Typography variant="h6" sx={{ mb: 1 }}>
                    Detalles de la Ubicación
                </Typography>

                <OptionPicker
                    urlData='/api/master/communities'
                    label="Comunidad Autonoma"
                    name="community_id"
                    value={formValues.community_id}
                    onChange={handleOnChange}
                    idKey='mst_comunidades_id'
                    labelKey='nombre_corto'
                />

                <OptionPicker
                    urlData={`/api/master/communities/${formValues.community_id}/provinces`}
                    label="Provincia"
                    name="province_id"
                    value={formValues.province_id}
                    onChange={handleOnChange}
                    idKey='mst_provincias_id'
                    labelKey='nombre'
                />

                <OptionPicker
                    urlData={`/api/master/provinces/${formValues.province_id}/cities`}
                    label="Ciudad"
                    name="city_id"
                    value={formValues.city_id}
                    onChange={handleOnChange}
                    idKey='mst_ciudades_id'
                    labelKey='nombre'
                />

                <LoaderButton text="Crear Oferta" loading={loading} sx={{ mt: 2 }} />
            </Box>
        </Modal>
    );
};

export default CreateOfferModal;
