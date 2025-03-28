import { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const EmpresaCreandoPerfil = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/perfil-empresa");
    }, 2500);

    return () => clearTimeout(timeout);
  }, [navigate]);

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
        src="/images/funny.gif"
        alt="Cargando perfil"
        style={{ width: "150px", height: "150px" }}
      />
      <Typography variant="h6" color="text.secondary">
        Estamos preparando tu perfil...
      </Typography>
    </Box>
  );
};

export default EmpresaCreandoPerfil;
