import { Box, FormControl, FormControlLabel, Switch, Typography } from "@mui/material";
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
    estado: 1,
    requirements_list: []
};

const CreateOfferForm = ({
    setOffersData,
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

    const handleStateChange = (event) => {
        setFormValues((prev)=> ({...prev, estado: event.target.checked ? 1 : 0}));
    };

    const handleSubmitCreate = async (event) => {
        event.preventDefault();
        setLoading(true);
        formValues.emp_proyectos_id = proyectId;
        formValues.salario_anual = parseInt(formValues.salario_anual);
        formValues.fecha_creacion = new Date();
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

    const handleSubmitUpdate = async (event) => {
        event.preventDefault();
        setLoading(true);
        formValues.salario_anual = parseInt(formValues.salario_anual);
        formValues.requirements_list = requirements;

        try {
            const response = await axios.put(`/api/companies/update-offer/${offerId}`, formValues);
            const updatedRecord = response.data; 
            setOffersData((prev)=>
                prev.map((offer)=>
                    offer.emp_ofertas_id === offerId ? { ...offer, ...updatedRecord } : offer
                )
            );
            updateNotification("Oferta actualizado con exito", "success");
            openNotification();
            handleCloseModal();
        } catch (error) {
            console.error("Error al actualizar la oferta:", error);
            updateNotification("Ocurrió un error al actualizar la oferta", "error");
            openNotification();
        } finally {
            setLoading(false);
        }
    };

    useEffect(()=> {
        const fetchOfferData = async () => {
            try{
                const response = await axios.get(`/api/companies/offer-information/${offerId}`);
                const offerData = response.data;
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
                };
                const offerRequirements = offerData.requirements_list;
                setRequirements(offerRequirements.map(
                    (requirement) => requirement.descripcion
                ));
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
            onSubmit={ editMode ? handleSubmitUpdate : handleSubmitCreate}
        >
            <Typography variant="h6" sx={{ mb: 1 }}>
                {editMode ? "Editemos tu oferta" : "Crear Nueva Oferta de Empleo"}
            </Typography>

            <Box sx={{
                display: 'flex',
                width: '100%',
                gap: 1
            }}>
                <CustomTextFieldWithIcon
                    label="Nombre de la Oferta"
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