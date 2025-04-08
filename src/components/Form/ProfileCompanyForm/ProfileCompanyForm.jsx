import { Box, Typography, Button, Grid2 as Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useImageProfile } from "../../../contexts/ImageProfileContext/ImageProfileContext";
import { useAuth } from "../../../contexts/AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../../contexts/NotificationContext/NotificationContext";
import axios from "axios";
import CustomTextFieldWithIcon from "../../TextField/CustomTextFieldWithIcon/CustomTextFieldWithIcon";
import LoaderButton from "../../Button/LoaderButton/LoaderButton";
import OptionPicker from "../../Picker/OptionPicker/OptionPicker";
import { motion } from "framer-motion";
import { useTheme } from "@mui/material";

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
  const [showPlans, setShowPlans] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hovering, setHovering] = useState(false);
  const navigate = useNavigate();
  const { selectedImage } = useImageProfile();
  const { accessToken } = useAuth();
  const { updateNotification, openNotification } = useNotification();
  const theme = useTheme();

  const handleSubmit = (event) => {
    event.preventDefault();
    setShowPlans(true);
  };

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSetCompanyRole = async () => {
    try {
      const response = await axios.post(
        "/api/master/set-role",
        { roleId: 2 },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error setting role: ", error);
      throw error;
    }
  };

  const handleCreateCompany = async () => {
    try {
      await handleSetCompanyRole();
      const response = await axios.post(
        "/api/companies/create-company-profile",
        {
          ...formValues,
          image: selectedImage,
        },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      console.log("Respuesta del servidor al crear la empresa:", response.data);
      console.log("ID de la empresa creada:", response.data[0].emp_empresas_id);

      if (!response.data || !response.data[0] || !response.data[0].emp_empresas_id) {
        throw new Error("No se pudo obtener el ID de la empresa de la respuesta del servidor");
      }

      return response.data[0].emp_empresas_id;
    } catch (error) {
      console.error("Error al crear empresa:", error);
      throw error;
    }
  };

  const handleFreePlan = async () => {
    setLoading(true);
    const baseUrl = window.location.origin;

    try {
      const companyId = await handleCreateCompany();

      if (!companyId) {
        console.error("companyId is undefined");
        updateNotification(
          "No se pudo obtener el ID de la empresa creada",
          "error"
        );
        openNotification();
        setLoading(false);
        return;
      }

      const dataToSave = { ...formValues, image: selectedImage };
      sessionStorage.setItem("companyFormData", JSON.stringify(dataToSave));

      updateNotification("Perfil creado con el plan gratuito", "success");
      openNotification();
      setTimeout(() => {
        navigate(`/empresa/creando-perfil?companyId=${companyId}`);
      }, 2000);
    } catch (error) {
      console.error("Error al crear la empresa:", error);
      if (error.response) {
        updateNotification(
          error.response.data.error || "Error al crear el perfil con el plan gratuito",
          "error"
        );
      } else {
        updateNotification("Error de conexión con el servidor", "error");
      }
      openNotification();
      setLoading(false);
    }
  };

  const handlePremiumPlan = async () => {
    setLoading(true);
    const baseUrl = window.location.origin;

    try {
      const companyId = await handleCreateCompany();

      if (!companyId) {
        throw new Error("No se pudo obtener el ID de la empresa creada");
      }

      const dataToSave = { ...formValues, image: selectedImage };
      sessionStorage.setItem("companyFormData", JSON.stringify(dataToSave));

      const res = await axios.post("/api/stripe/create-checkout-session", {
        baseUrl,
        companyId,
        plan: "premium",
      });

      window.location.href = res.data.url;
    } catch (error) {
      console.error("Error iniciando pago:", error);
      updateNotification("Error iniciando el pago con Stripe", "error");
      openNotification();
      setLoading(false);
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

  if (isSubmitting) {
    return (
      <Box
        sx={{
          height: "70vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 3,
        }}
      >
        <img
          src="/funny.gif"
          alt="Cargando perfil"
          style={{ width: "150px", height: "150px" }}
        />
        <Typography variant="h6" color="text.secondary">
          Estamos preparando tu perfil...
        </Typography>
      </Box>
    );
  }

  return (
        <Box
            component="form"
            onSubmit={editMode ? handleSubmitUpdate : handleSubmit}
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
            {!showPlans && (
        <LoaderButton text="Crear perfil de empresa" loading={loading} />
      )}

      {showPlans && (
        <Grid container spacing={2} mt={4}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                border: "2px solid",
                borderColor: "success.main",
                borderRadius: 2,
                p: 3,
                textAlign: "center",
              }}
            >
              <Typography variant="h6" fontWeight="bold" color="success.main">
                Plan Gratuito
              </Typography>
              <Typography sx={{ my: 2 }}>
                Crea tu perfil de empresa y visualiza ofertas.
              </Typography>
              <Button
                fullWidth
                variant="contained"
                color="success"
                onClick={handleFreePlan}
                disabled={loading}
              >
                Elegir Gratis
              </Button>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                border: "2px solid",
                borderColor: "warning.main",
                bgcolor: theme.palette.warning.light,
                borderRadius: 2,
                p: 3,
                textAlign: "center",
              }}
            >
              <Typography variant="h6" fontWeight="bold">
                Plan Premium{" "}
                <motion.span
                  role="img"
                  aria-label="abejita"
                  animate={
                    hovering
                      ? { rotate: [0, 15, -15, 10, -10, 5, -5, 0] }
                      : { rotate: 0 }
                  }
                  transition={{ duration: 0.6 }}
                  style={{ display: "inline-block" }}
                >
                  🐝
                </motion.span>
              </Typography>
              <Typography sx={{ my: 2 }}>
                Publica ofertas de trabajo y accede a herramientas exclusivas.
              </Typography>
              <Button
                fullWidth
                variant="contained"
                sx={{
                  backgroundColor: "#FFEB3B",
                  color: "#000",
                  "&:hover": {
                    backgroundColor: "#FDD835",
                  },
                }}
                onMouseEnter={() => setHovering(true)}
                onMouseLeave={() => setHovering(false)}
                onClick={handlePremiumPlan}
                disabled={loading}
              >
                Elegir Premium
              </Button>
            </Box>
          </Grid>
        </Grid>
      )}
        </Box>
    );
};

export default ProfileCompanyForm;