import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useImageProfile } from "../../../contexts/ImageProfileContext/ImageProfileContext";
import { useAuth } from "../../../contexts/AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../../contexts/NotificationContext/NotificationContext";
import axios from "axios";
import CustomTextFieldWithIcon from "../../TextField/CustomTextFieldWithIcon/CustomTextFieldWithIcon";
import LoaderButton from "../../Button/LoaderButton/LoaderButton";
import OptionPicker from "../../Picker/OptionPicker/OptionPicker";

const INITIAL_VALUES = {
    nombre: '',
    acronimo: '',
    mst_comunidades_id: 7,
    mst_provincias_id: 28,
    mst_ciudades_id: '',
    image: ''
};

const ProfileCompanyForm = ({
    editMode,
    handleCloseModal
}) => {
    const [formValues, setFormValues] = useState(INITIAL_VALUES);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { selectedImage } = useImageProfile();
    const { accessToken } = useAuth();
    const { updateNotification, openNotification } = useNotification();

    const handleSubmitCreate = async (event) => {
        event.preventDefault();
        setLoading(true);
        formValues.image = selectedImage;
        await handleSetCompanyRole();

        try {
            await axios.post(
                '/api/companies/create-company-profile',
                formValues,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    }
                }
            );

            updateNotification('Perfil creado con exito!', 'success');
            openNotification();
            setTimeout(() => {
                navigate('/perfil-empresa');
                setFormValues(INITIAL_VALUES);
            }, 2500);
        } catch (error) {
            console.error('Error creating company:', error);
            updateNotification('Vaya no se puedo crear tu perfil', 'error');
            openNotification();
        } finally {
            setLoading(false);
        }
    };

    const handleSetCompanyRole = async () => {
        try {
            await axios.post(
                '/api/master/set-role',
                { roleId: 2 },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    }
                },
            );
        } catch (error) {
            console.error('Error setting role: ', error);
        }
    };

    const handleSubmitUpdate = async (event) => {
        event.preventDefault();
        setLoading(true);

        try{
            const response = await axios.put('/api/companies/update-profile', formValues, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            });

            updateNotification('Perfil actualizado con exito!', 'success');
            openNotification();
        } catch (error) {
            console.error('Error updating company:', error);
            updateNotification('Lo sentimos, algo ha salido mal', 'error');
            openNotification();
        } finally {
            setLoading(false);
            setFormValues(INITIAL_VALUES);
            handleCloseModal();
        }
    };

    const handleOnChange = (event) => {
        const { name, value } = event.target;
        setFormValues(prev => ({ ...prev, [name]: value }));
    };

    useEffect(() => {
        const fetchCompanyData = async () => {
            try {
                const response = await axios.get('/api/companies/company-information', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    }
                });
                const companyData = response.data;
                const mappedData = {
                    nombre: companyData.nombre,
                    acronimo: companyData.acronimo,
                    mst_comunidades_id: companyData.mst_ciudades_id.mst_provincias_id.mst_comunidades_id.mst_comunidades_id,
                    mst_provincias_id: companyData.mst_ciudades_id.mst_provincias_id.mst_provincias_id,
                    mst_ciudades_id: companyData.mst_ciudades_id.mst_ciudades_id,
                }
                setFormValues(mappedData);
            } catch (error) {
                console.error('Error fetching company data:', error);
                updateNotification("No pudimos obtener la información", 'error');
                openNotification();
            }
        };

        if (editMode) fetchCompanyData();
    },[]);

    return (
        <Box
            component="form"
            onSubmit={editMode ? handleSubmitUpdate : handleSubmitCreate}
        >
            <Typography
                variant="h6"
                sx={{
                    mb: 1
                }}
            >
                {editMode ? "Datos de la empresa: " : "Sobre tu empresa:"}
            </Typography>
            <CustomTextFieldWithIcon
                label="Nombre de la empresa"
                name="nombre"
                value={formValues.nombre}
                onChange={handleOnChange}
                required
            />
            <CustomTextFieldWithIcon
                label="Acrónimo"
                name="acronimo"
                value={formValues.acronimo}
                onChange={handleOnChange}
                required
            />
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
                text={editMode ? "Actulizar" : "Crear perfil de empresa"}
                loading={loading}
            />
        </Box>
    );
};

export default ProfileCompanyForm;
