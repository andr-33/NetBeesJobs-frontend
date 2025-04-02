import { Box, Typography, Button, Grid2 as Grid } from "@mui/material";
import { useState } from "react";
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
  name: "",
  acronym: "",
  community_id: 7,
  province_id: 28,
  city_id: "",
  image: "",
};

const ProfileCompanyForm = () => {
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
      await axios.post(
        "/api/master/set-role",
        { roleId: 2 },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
    } catch (error) {
      console.error("Error setting role: ", error);
    }
  };

  const handleCreateCompany = async () => {
    try {
      await handleSetCompanyRole();
      await axios.post(
        "/api/companies/create-company-profile",
        {
          ...formValues,
          image: selectedImage,
        },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
    } catch (error) {
      console.error("Error al crear empresa: ", error);
    }
  };

  const handleFreePlan = async () => {
    try{
      await handleCreateCompany();
      updateNotification("Perfil creado con el plan gratuito", "success");
      openNotification();
      setTimeout(()=>{
        navigate("/empresa/creando-perfil");
      }, 2000);
    } catch(error) {
      updateNotification("Error al crear el perfil con el plan gratuito", "error");
      openNotification();
    }
  };

  const handlePremiumPlan = async () => {
    setLoading(true);
    try {
      const dataToSave = { ...formValues, image: selectedImage };
      sessionStorage.setItem("companyFormData", JSON.stringify(dataToSave));

      const res = await axios.post("/api/stripe/create-checkout-session", {
        success_url: "http://localhost:5173/perfil-empresa",
        cancel_url: "http://localhost:5173/empresa/cancel",
      });

      window.location.href = res.data.url;
    } catch (error) {
      console.error("Error iniciando pago:", error);
      updateNotification("Error iniciando el pago con Stripe", "error");
      openNotification();
      setLoading(false);
    }
  };

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
    <Box component="form" onSubmit={handleSubmit}>
      <CustomTextFieldWithIcon
        label="Nombre de la empresa"
        name="name"
        value={formValues.name}
        onChange={handleOnChange}
        required
      />
      <CustomTextFieldWithIcon
        label="Acrónimo"
        name="acronym"
        value={formValues.acronym}
        onChange={handleOnChange}
        required
      />
      <OptionPicker
        urlData="/api/master/communities"
        label="Comunidad Autonoma"
        name="community_id"
        value={formValues.community_id}
        onChange={handleOnChange}
        idKey="mst_comunidades_id"
        labelKey="nombre_corto"
      />
      <OptionPicker
        urlData={`/api/master/communities/${formValues.community_id}/provinces`}
        label="Provincia"
        name="province_id"
        value={formValues.province_id}
        onChange={handleOnChange}
        idKey="mst_provincias_id"
        labelKey="nombre"
      />
      <OptionPicker
        urlData={`/api/master/provinces/${formValues.province_id}/cities`}
        label="Ciudad"
        name="city_id"
        value={formValues.city_id}
        onChange={handleOnChange}
        idKey="mst_ciudades_id"
        labelKey="nombre"
      />

      {!showPlans && (
        <LoaderButton text="Crear perfil de empresa" loading={loading} />
      )}

      {showPlans && (
        <Grid container spacing={2} mt={4}>
          <Grid  size={{xs:12, md:6}}>
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

          <Grid size={{xs:12, md:6}}>
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
