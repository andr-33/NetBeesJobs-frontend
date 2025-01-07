import { Box, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import { useImageProfile } from "../../../contexts/ImageProfileContext/ImageProfileContext";
import { useAuth } from "../../../contexts/AuthContext/AuthContext";
import axios from "axios";
import CustomTextFieldWithIcon from "../../TextField/CustomTextFieldWithIcon/CustomTextFieldWithIcon";
import LoaderButton from "../../Button/LoaderButton/LoaderButton";
import OptionPicker from "../../Picker/OptionPicker/OptionPicker";

const INITIAL_VALUES = {
    nombre: '',
    acronimo: '',
    community: 7,
    province: 28,
    mst_ciudades_id: '',
    image: ''
};

const ProfileCompanyForm = () => {
    const [formValues, setFormValues] = useState(INITIAL_VALUES);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const theme = useTheme();
    const { selectedImage } = useImageProfile();
    const { accessToken } = useAuth();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);
        formValues.image = selectedImage;

        try {
            const response = await axios.post(
                '/api/company/create-company-profile',
                formValues,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    }
                }
            );
            console.log('Company created:', response.data);
        } catch (error) {
            console.error('Error creating company:', error);
            setError(error.response?.data?.error || 'Ups... algo ha salido mal, intentalo nuevamente');
        } finally {
            setLoading(false);
        }
    };

    const handleOnChange = (event) => {
        const { name, value } = event.target;
        setFormValues(prev => ({ ...prev, [name]: value }));
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
        >
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
                name="community"
                value={formValues.community}
                onChange={handleOnChange}
                idKey='mst_comunidades_id'
                labelKey='nombre_corto'
            />
            <OptionPicker
                urlData={`/api/master/communities/${formValues.community}/provinces`}
                label="Provincia"
                name="province"
                value={formValues.province}
                onChange={handleOnChange}
                idKey='mst_provincias_id'
                labelKey='nombre'
            />
            <OptionPicker
                urlData={`/api/master/provinces/${formValues.province}/cities`}
                label="Ciudad"
                name="mst_ciudades_id"
                value={formValues.mst_ciudades_id}
                onChange={handleOnChange}
                idKey='mst_ciudades_id'
                labelKey='nombre'
            />
            <LoaderButton
                text="Crear perfil de empresa"
                loading={loading}
            />
            {error && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
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

export default ProfileCompanyForm;
