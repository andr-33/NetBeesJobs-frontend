import { Box, Typography } from "@mui/material";

const LoadingProfileScreen = () => {
  return (
    <Box
      sx={{
        height: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 3,
      }}
    >
      <img
        src="illustrations/funny.gif"
        alt="Cargando perfil"
        style={{ width: '150px', height: '150px' }}
      />
      <Typography variant="h6" color="text.secondary">
        Estamos preparando tu perfil...
      </Typography>
    </Box>
  );
};

export default LoadingProfileScreen;
