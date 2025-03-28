import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext/AuthContext";
import { useNotification } from "../contexts/NotificationContext/NotificationContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const StripeSuccess = () => {
  const { accessToken } = useAuth();
  const { updateNotification, openNotification } = useNotification();
  const navigate = useNavigate();

  useEffect(() => {
    const createCompanyProfile = async () => {
      const formValues = JSON.parse(sessionStorage.getItem("companyFormData"));
      if (!formValues) return;

      try {
        await axios.post("/api/master/set-role", { roleId: 2 }, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        await axios.post("/api/companies/create-company-profile", formValues, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        updateNotification("Perfil creado con éxito tras el pago", "success");
        openNotification();
        sessionStorage.removeItem("companyFormData");
        setTimeout(() => navigate("/perfil-empresa"), 2500);
      } catch (error) {
        console.error("Error al crear perfil tras pago:", error);
        updateNotification("Error creando perfil tras pago", "error");
        openNotification();
      }
    };

    createCompanyProfile();
  }, []);

  return <p>Procesando creación de tu perfil de empresa...</p>;
};

export default StripeSuccess;
