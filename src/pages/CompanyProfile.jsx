import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Box, Button, IconButton, Skeleton, Typography, useTheme } from "@mui/material";
import { useAuth } from "../contexts/AuthContext/AuthContext";
import {
  NotificationProvider,
  useNotification,
} from "../contexts/NotificationContext/NotificationContext";
import ImageAvatar from "../components/Avatar/ImageAvatar/ImageAvatar";
import CompanySidebar from "../components/Sidebar/CompanySidebar/CompanySidebar";
import axios from "axios";
import SlideUpNotification from "../components/Notification/SlideUpNotification/SlideUpNotification";
import ProjectsSection from "../components/Section/ProjectsSection/ProjectsSection";
import CandidatesSection from "../components/Section/CandidatesSection/CandidatesSection";
import OfferSection from "../components/Section/OffersSection/OffersSection";
import { EditRounded } from "@mui/icons-material";
import EditCompanyProfileModal from "../components/Modal/EditCompanyProfileModal/EditCompanyProfile";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

const InformationLoadingSkeletons = () => {
  return (
    <>
      {Array.from({ length: 3 }).map((_, index) => (
        <Skeleton
          key={index}
          variant="text"
          sx={{
            fontSize: index === 0 ? "1.25rem" : "1rem",
            width: index === 0 ? "200px" : "150px",
          }}
        />
      ))}
    </>
  );
};

const CompanyProfilePage = () => {
  const [expanded, setExpanded] = useState(false);
  const [FetchingCompanyInfo, setFetchingCompanyInfo] = useState(false);
  const [companyInfo, setCompanyInfo] = useState(null);
  const [activeSection, setActiveSection] = useState('projects');
  const [openEditProfileModal, setOpenEditProfileModal] = useState(false);
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const { accessToken } = useAuth();
  const { notification, closeNotification, updateNotification, openNotification } = useNotification();
  const location = useLocation();

  const sectionComponents = {
    projects: <ProjectsSection />,
    candidates: <CandidatesSection />,
    offers: <OfferSection />,
  };

  const fetchCompanyInformation = async () => {
    setFetchingCompanyInfo(true);
    try {
      const response = await axios.get("/api/companies/company-information", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setCompanyInfo(response.data);
    } catch (error) {
      console.error("Error al obtener información de la empresa:", error);
      updateNotification("No pudimos obtener tu información", "error");
      openNotification();
    } finally {
      setFetchingCompanyInfo(false);
    }
  };

  useEffect(() => {
    fetchCompanyInformation();

    const params = new URLSearchParams(location.search);
    const sessionId = params.get("session_id");
    const companyId = params.get("company_id");

    if (sessionId && companyId) {
      updateNotification(
        "¡Pago exitoso! Tu suscripción ha sido actualizada a Premium.",
        "success"
      );
      openNotification();
      fetchCompanyInformation();
      window.history.replaceState({}, document.title, "/perfil-empresa");
    }
  }, [accessToken, location]);

  const formatDate = (dateISO) => {
    const newDate = new Date(dateISO);
    const opciones = {
      day: "numeric",
      month: "short",
      year: "numeric",
    };
    const formatter = new Intl.DateTimeFormat("es-ES", opciones);
    return formatter.format(newDate).replace(".", "");
  };

  const handleUpgradeToPremium = async () => {
    if (!companyInfo || !companyInfo.emp_empresas_id) {
      updateNotification(
        "No se pudo obtener la información de la empresa",
        "error"
      );
      openNotification();
      return;
    }

    setLoading(true);
    const baseUrl = window.location.origin;

    try {
      const companyId = companyInfo.emp_empresas_id;

      console.log("📤 Enviando solicitud para crear sesión de Stripe:", {
        baseUrl,
        companyId,
        plan: "premium",
      });

      const paymentSession = await axios.post(
        "/api/stripe/create-checkout-session",
        {
          baseUrl,
          companyId,
          plan: "premium",
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      window.location.href = paymentSession.data.url;
    } catch (error) {
      console.error("Error al iniciar el pago con Stripe:", error);
      if (error.response) {
        updateNotification(
          error.response.data.error || "Error iniciando el pago con Stripe",
          "error"
        );
      } else {
        updateNotification("Error de conexión con el servidor", "error");
      }
      openNotification();
      setLoading(false);
    }
  };

  return (
    <>
      <Box sx={{
        display: 'flex',
        backgroundColor: theme.palette.background.default,
        position: 'relative',
        pl: '70px'
      }}>
        <CompanySidebar
          expanded={expanded}
          setExpanded={setExpanded}
          setActiveSection={setActiveSection}
        />
        <Box sx={{ flexGrow: 1, p: 3 }}>
          <Box sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2
          }}>
            <ImageAvatar roleId={2} />
            {companyInfo ? (
              <Box>
                <Box sx={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'flex-end'
                }}>
                  <IconButton
                    size="small"
                    onClick={() => setOpenEditProfileModal(true)}
                    sx={{
                      ":hover": {
                        color: theme.palette.success.main
                      }
                    }}
                  >
                    <EditRounded />
                  </IconButton>
                </Box>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: '600',
                    fontSize: 30
                  }}
                >
                  {companyInfo.nombre} ({companyInfo.acronimo})
                </Typography>
                <Typography variant="body2" fontWeight={'600'}>Fecha de alta:
                  <Typography component={'span'}> {formatDate(companyInfo.fecha_alta)}</Typography>
                </Typography>
                <Typography variant="body2" fontWeight={'600'}>En:
                  <Typography component={'span'}> {companyInfo.mst_ciudades_id.nombre}</Typography>
                </Typography>
                {companyInfo.suscripcion === "premium" && (
                  <Button
                    sx={{
                      mt: 2,
                      background:
                        "linear-gradient(90deg,rgb(241, 184, 50) 0%, #1C1C1C 100%)",
                      color: "white",
                      borderRadius: "20px",
                      padding: "8px 16px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "bold",
                    }}
                    variant="contained"
                  >
                    <AutoAwesomeIcon sx={{ mr: 1 }} />
                    Premium
                  </Button>
                )}
                {companyInfo.suscripcion === "gratis" && (
                  <Button
                    sx={{ mt: 2 }}
                    variant="contained"
                    color="warning"
                    onClick={handleUpgradeToPremium}
                    disabled={loading}
                  >
                    Cambiar a Premium
                  </Button>
                )}

              </Box>
            ) : (
              <Box>
                <InformationLoadingSkeletons />
              </Box>
            )}
          </Box>

          <Box component='main' sx={{ mt: 2 }}>
            {sectionComponents[activeSection]}
          </Box>
        </Box>
      </Box>

      <EditCompanyProfileModal
        openModal={openEditProfileModal}
        handleCloseModal={() => setOpenEditProfileModal(false)}
      />

      <SlideUpNotification
        message={notification.message}
        type={notification.type}
        open={notification.open}
        handleClose={closeNotification}
      />
    </>
  );
};

export default () => (
  <NotificationProvider>
    <CompanyProfilePage />
  </NotificationProvider>
);
