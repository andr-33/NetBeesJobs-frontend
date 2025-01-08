import { Box, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import { useImageProfile } from "../../../contexts/ImageProfileContext/ImageProfileContext";
import { useAuth } from "../../../contexts/AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CustomTextFieldWithIcon from "../../TextField/CustomTextFieldWithIcon/CustomTextFieldWithIcon";
import LoaderButton from "../../Button/LoaderButton/LoaderButton";
import OptionPicker from "../../Picker/OptionPicker/OptionPicker";
import TextFieldWithPicker from "../../TextField/TextFieldWithPicker/TextFieldWithPicker";
import CustomDatePicker from "../../Picker/CustomDatePicker/CustomDatePicker";

const INITIAL_VALUES = {
  name: "",
  surname: "",
  second_surname: "",
  genre: "",
  birth_day: "", 
  phone_number: "",
  nationality: "",
  document_type: 1,
  document_number: '',
  community_id: 7,  
  province_id: 28,  
  city_id: "",  
  zip_code: "",  
  image: "",    
};

const ProfileUserForm = () => {
  const [formValues, setFormValues] = useState(INITIAL_VALUES);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const theme = useTheme();
  const navigate = useNavigate();
  const { selectedImage } = useImageProfile(); 
  const { accessToken } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    formValues.image = selectedImage; 

    try {
      const response = await axios.post(
        "/api/users/create-user-profile",
        formValues,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, 
          }
        }
      );
      navigate('/pagina-principal');
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

  const handleDateChange = (name) => (date) => {
    setFormValues((prev) => ({...prev, [name]: date.format('YYYY-MM-DD')}));
  }

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography 
        variant="h6"
        sx={{
          mb: 1
        }}
      >
        Sobre ti: 
      </Typography>
      <CustomTextFieldWithIcon
        label="Nombre"
        name="name"
        value={formValues.name}
        onChange={handleOnChange}
        required
      />
      <CustomTextFieldWithIcon
        label="Primer Apellido"
        name="surname"
        value={formValues.surname}
        onChange={handleOnChange}
        required
      />
      <CustomTextFieldWithIcon
        label="Segundo Apellido"
        name="second_surname"
        value={formValues.second_surname}
        onChange={handleOnChange}
      />
      <OptionPicker
        urlData='/api/master/genres'
        label="Género"
        name="genre"
        value={formValues.genre}
        onChange={handleOnChange}
        idKey='mst_sexo_id'
        labelKey='descripcion'
      />
      <CustomTextFieldWithIcon 
        label="Teléfono"
        name="phone_number"
        value={formValues.phone_number}
        type="tel"
        onChange={handleOnChange}
        required
      />
      <OptionPicker
        urlData='/api/master/countries'
        label="Nacionalidad"
        name="nationality"
        value={formValues.nationality}
        onChange={handleOnChange}
        idKey='mst_paises_id'
        labelKey='nombre'
      />
      <CustomDatePicker 
        label='Fecha de cumpleaños'
        onChangeDate={handleDateChange('birth_day')}
      />
      <TextFieldWithPicker 
        urlData='/api/master/document-types'
        labelPicker='Tipo de documento'
        namePicker='document_type'
        valuePicker={formValues.document_type}
        onChangePicker={handleOnChange}
        idKey='mst_clases_doc_id'
        labelKey='clase'
        labelTextField='No. de documento'
        nameTextField='document_number'
        valueTextField={formValues.document_number}
        onChangeTextField={handleOnChange}
      />
      <Typography 
        variant="h6"
        sx={{
          mb: 1
        }}
      >
        ¿Dónde vives?
      </Typography>
      <OptionPicker
        urlData='/api/master/communities'
        label="Comunidad Autónoma"
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
      <CustomTextFieldWithIcon 
        label="Código postal"
        name="zip_code"
        value={formValues.zip_code}
        type="number"
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
