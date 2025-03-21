import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { useNotification } from "../../../contexts/NotificationContext/NotificationContext";
import CustomTextFieldWithIcon from "../../TextField/CustomTextFieldWithIcon/CustomTextFieldWithIcon";
import OptionPicker from "../../Picker/OptionPicker/OptionPicker";
import TextDynamicList from "../../DynamicList/TextDynamicList/TextDynamicList";
import LoaderButton from "../../Button/LoaderButton/LoaderButton";
import axios from "axios";

const INITIAL_VALUES = {
    name: "",
    description: "",
    salary: 0,
    job_id: "",
    job_modality_id: 1,
    working_day_id: 1,
    sector_id: "",
    community_id: 7,
    province_id: 28,
    city_id: "",
    project_id: 0,
    created_at: null,
    requirements_list: []
};

const CreateOfferForm = ({
    proyectId, 
    handleCloseModal
}) => {
    const [formValues, setFormValues] = useState(INITIAL_VALUES);
    const [requirements, setRequirements] = useState([""]);
    const [loading, setLoading] = useState(false);
    const { updateNotification, openNotification } = useNotification();

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
        formValues.requirements_list = requirements;

        try {
            const response = await axios.post("/api/companies/create-offer-in-project", formValues);
            updateNotification(response.data.message, 'success');
            openNotification();
        } catch (error) {
            console.error("Error al crear la oferta:", error);
            updateNotification("Ocurrió un error. Inténtalo de nuevo", 'error');
            openNotification();
        } finally {
            setLoading(false);
            setFormValues(INITIAL_VALUES);
            setRequirements([""]);
            handleCloseModal();
        }
    };
    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
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

            <Typography variant="h6" sx={{ mb: 1 }}>
                Detalles de la Oferta
            </Typography>
            <OptionPicker
                urlData="/api/master/job-modality"
                label="Modalidad"
                name="job_modality_id"
                value={formValues.job_modality_id}
                onChange={handleOnChange}
                idKey="mst_modalidad_id"
                labelKey="descripcion"
            />

            <OptionPicker
                urlData="/api/master/working-day"
                label="Jornada Laboral"
                name="working_day_id"
                value={formValues.working_day_id}
                onChange={handleOnChange}
                idKey="mst_jornada_id"
                labelKey="descripcion"
            />

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

            <TextDynamicList
                title={'Requisitos'}
                items={requirements}
                setItems={setRequirements}
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
    );
};

export default CreateOfferForm;