import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNotification } from "../../../contexts/NotificationContext/NotificationContext";
import CustomTextFieldWithIcon from "../../TextField/CustomTextFieldWithIcon/CustomTextFieldWithIcon";
import OptionPicker from "../../Picker/OptionPicker/OptionPicker";
import TextDynamicList from "../../DynamicList/TextDynamicList/TextDynamicList";
import LoaderButton from "../../Button/LoaderButton/LoaderButton";
import axios from "axios";

const INITIAL_VALUES = {
    nombre: "",
    descripcion: "",
    salario_anual: 0,
    mst_puestos_id: "",
    mst_modalidad_id: 1,
    mst_jornada_id: 1,
    mst_emp_sector_id: "",
    mst_comunidades_id: 7,
    mst_provincias_id: 28,
    mst_ciudades_id: "",
    emp_proyectos_id: 0,
    fecha_creacion: null,
    stado: 1,
    requirements_list: []
};

const CreateOfferForm = ({
    proyectId, 
    handleCloseModal,
    editMode,
    offerId
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

    useEffect(()=> {
        const fetchOfferData = async () => {
            try{
                const response = await axios.get(`/api/companies/offer-information/${offerId}`);
                const offerData = response.data[0];
                const mappedData = {
                    nombre: offerData.nombre,
                    descripcion: offerData.descripcion,
                    salario_anual: offerData.salario_anual,
                    mst_puestos_id: offerData.mst_puestos_id.mst_puestos_id,
                    mst_modalidad_id: offerData.mst_modalidad_id,
                    mst_jornada_id: offerData.mst_jornada_id,
                    mst_emp_sector_id: offerData.mst_emp_sector_id.mst_emp_sector_id,
                    mst_comunidades_id: offerData.mst_ciudades_id.mst_provincias_id.mst_comunidades_id.mst_comunidades_id,
                    mst_provincias_id: offerData.mst_ciudades_id.mst_provincias_id.mst_provincias_id,
                    mst_ciudades_id: offerData.mst_ciudades_id.mst_ciudades_id,
                    estado: offerData.estado,
                    requirements_list: []
                };
                setFormValues(mappedData);
            } catch(error){
                console.error(error)
            }
        };

        if(editMode) fetchOfferData();
    },[]);

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
        >
            <Typography variant="h6" sx={{ mb: 1 }}>
                {editMode ? "Editemos tu oferta" : "Crear Nueva Oferta de Empleo"}
            </Typography>

            <CustomTextFieldWithIcon
                label="Nombre de la Oferta"
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

            <CustomTextFieldWithIcon
                label="Salario Anual (€)"
                name="salario_anual"
                type="number"
                value={formValues.salario_anual}
                onChange={handleOnChange}
                required
            />

            <Typography variant="h6" sx={{ mb: 1 }}>
                Detalles de la Oferta
            </Typography>
            <OptionPicker
                urlData="/api/master/job-modality"
                label="Modalidad"
                name="mst_modalidad_id"
                value={formValues.mst_modalidad_id}
                onChange={handleOnChange}
                idKey="mst_modalidad_id"
                labelKey="descripcion"
            />

            <OptionPicker
                urlData="/api/master/working-day"
                label="Jornada Laboral"
                name="mst_jornada_id"
                value={formValues.mst_jornada_id}
                onChange={handleOnChange}
                idKey="mst_jornada_id"
                labelKey="descripcion"
            />

            <OptionPicker
                urlData="/api/master/job-positions"
                label="Puesto"
                name="mst_puestos_id"
                value={formValues.mst_puestos_id}
                onChange={handleOnChange}
                idKey="mst_puestos_id"
                labelKey="nombre"
            />

            <OptionPicker
                urlData="/api/master/sectors"
                label="Sector"
                name="mst_emp_sector_id"
                value={formValues.mst_emp_sector_id}
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
                name="mst_comunidades_id"
                value={formValues.mst_comunidades_id}
                onChange={handleOnChange}
                idKey='mst_comunidades_id'
                labelKey='nombre_corto'
            />

            <OptionPicker
                urlData={`/api/master/communities/${formValues.mst_comunidades_id}/provinces`}
                label="Provincia"
                name="mst_provincias_id"
                value={formValues.mst_provincias_id}
                onChange={handleOnChange}
                idKey='mst_provincias_id'
                labelKey='nombre'
            />

            <OptionPicker
                urlData={`/api/master/provinces/${formValues.mst_provincias_id}/cities`}
                label="Ciudad"
                name="mst_ciudades_id"
                value={formValues.mst_ciudades_id}
                onChange={handleOnChange}
                idKey='mst_ciudades_id'
                labelKey='nombre'
            />

            <LoaderButton 
                text={editMode ? "Actualizar" : "Crear Oferta"} 
                loading={loading} 
                sx={{ mt: 2 }} 
            />
        </Box>
    );
};

export default CreateOfferForm;