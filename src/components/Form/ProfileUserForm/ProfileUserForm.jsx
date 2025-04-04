import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useImageProfile } from "../../../contexts/ImageProfileContext/ImageProfileContext";
import { useAuth } from "../../../contexts/AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../../contexts/NotificationContext/NotificationContext";
import axios from "axios";
import dayjs from "dayjs";
import CustomTextFieldWithIcon from "../../TextField/CustomTextFieldWithIcon/CustomTextFieldWithIcon";
import LoaderButton from "../../Button/LoaderButton/LoaderButton";
import OptionPicker from "../../Picker/OptionPicker/OptionPicker";
import TextFieldWithPicker from "../../TextField/TextFieldWithPicker/TextFieldWithPicker";
import CustomDatePicker from "../../Picker/CustomDatePicker/CustomDatePicker";

const INITIAL_VALUES = {
  nombre: "",
  primer_apellido: "",
  segundo_apellido: "",
  mst_sexo_id: "",
  fecha_nacimiento: "",
  telefono_movil: "",
  nacionalidad_id: "",
  mst_clases_doc_id: 1,
  num_documento: '',
  mst_comunidades_id: 7,
  mst_provincias_id: 28,
  mst_ciudades_id: "",
  codigo_postal: "",
  image: "",
};

const ProfileUserForm = ({
  handleCloseModal,
  editMode
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
    await handleSetUserRole();

    try {
      await axios.post(
        "/api/users/create-user-profile",
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
        navigate('/pagina-principal');
        setFormValues(INITIAL_VALUES);
      }, 2500);
    } catch (error) {
      console.error("Error creating user:", error);
      updateNotification('Lo sentimos, algo ha salido mal', 'error');
      openNotification();
    } finally {
      setLoading(false);
    }
  };

  const handleSetUserRole = async () => {
    try {
      await axios.post(
        '/api/master/set-role',
        { roleId: 1 },
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
      const response = await axios.put('/api/users/update-user-profile', formValues, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      });

      console.log('Response: ', response.data);
      updateNotification('Perfil actualizado con exito!', 'success');
      openNotification();
    } catch (error) {
      console.error('Error updating user: ', error);
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
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (name) => (date) => {
    if (!date) return;

    setFormValues((prev) => ({ ...prev, [name]: date.format('YYYY-MM-DD') }));
  };

  useEffect(() => {
    const fetchUserInformation = async () => {
      try {
        const response = await axios.get('/api/users/user-information', {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        const userData = response.data;
        const mappedData = {
          nombre: userData.nombre,
          primer_apellido: userData.primer_apellido,
          segundo_apellido: userData.segundo_apellido,
          mst_sexo_id: userData.mst_sexo_id,
          fecha_nacimiento: userData.fecha_nacimiento,
          telefono_movil: userData.telefono_movil,
          nacionalidad_id: userData.nacionalidad_id,
          mst_clases_doc_id: userData.mst_clases_doc_id,
          num_documento: userData.num_documento,
          mst_comunidades_id: userData.mst_ciudades_id.mst_provincias_id.mst_comunidades_id.mst_comunidades_id,
          mst_provincias_id: userData.mst_ciudades_id.mst_provincias_id.mst_provincias_id,
          mst_ciudades_id: userData.mst_ciudades_id.mst_ciudades_id,
          codigo_postal: userData.codigo_postal,
        };
        setFormValues(mappedData);
      } catch (error) {
        console.error('Error: ', error.message);
        updateNotification("No pudimos obtener tu información", 'error');
        openNotification();
      }
    };
  
    if(editMode) fetchUserInformation();
  }, []);

  return (
    <Box 
      component="form" 
      onSubmit={editMode ? handleSubmitUpdate : handleSubmitCreate}>
      <Typography
        variant="h6"
        sx={{
          mb: 1
        }}
      >
        {editMode ? "Tus datos: ":"Sobre ti:"}
      </Typography>
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
      />
      <OptionPicker
        urlData='/api/master/genres'
        label="Género"
        name="mst_sexo_id"
        value={formValues.mst_sexo_id}
        onChange={handleOnChange}
        idKey='mst_sexo_id'
        labelKey='descripcion'
      />
      <CustomTextFieldWithIcon
        label="Teléfono"
        name="telefono_movil"
        value={formValues.telefono_movil}
        type="tel"
        onChange={handleOnChange}
        required
      />
      <OptionPicker
        urlData='/api/master/countries'
        label="Nacionalidad"
        name="nacionalidad_id"
        value={formValues.nacionalidad_id}
        onChange={handleOnChange}
        idKey='mst_paises_id'
        labelKey='nombre'
      />
      <CustomDatePicker
        label='Fecha de cumpleaños'
        onChangeDate={handleDateChange('fecha_nacimiento')}
        value={dayjs(formValues.fecha_nacimiento)}
      />
      <TextFieldWithPicker
        urlData='/api/master/document-types'
        labelPicker='Tipo de documento'
        namePicker='mst_clases_doc_id'
        valuePicker={formValues.mst_clases_doc_id}
        onChangePicker={handleOnChange}
        idKey='mst_clases_doc_id'
        labelKey='clase'
        labelTextField='No. de documento'
        nameTextField='num_documento'
        valueTextField={formValues.num_documento}
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
      <CustomTextFieldWithIcon
        label="Código postal"
        name="codigo_postal"
        value={formValues.codigo_postal}
        type="number"
        onChange={handleOnChange}
        required
      />
      <LoaderButton
        text={editMode ? "Actualizar" : "Crear perfil"}
        loading={loading}
      />
    </Box>
  );
};

export default ProfileUserForm;
