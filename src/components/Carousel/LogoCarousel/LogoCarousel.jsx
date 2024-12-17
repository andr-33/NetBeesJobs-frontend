import React from 'react';
import { Box, Paper, useTheme } from '@mui/material';

const logos = [
  '/logos/borygo-logo.png',
  '/logos/boryszew-logo.png',
  '/logos/gira-logo.png',
  '/logos/maflow-logo.png',
  '/logos/netbees-logo.png',
  '/logos/tim-logo.png',
  '/logos/vanitas-logo.png',
];

const LogoCarousel = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        overflow: 'hidden', // Ocultar contenido fuera del contenedor
        width: '100%',
        position: 'relative',
        backgroundColor: theme.palette.background.default,
        py:2 // Fondo del carrusel
      }}
    >
      {/* Contenedor animado */}
      <Box
        sx={{
          display: 'flex',
          width: '200%', // Duplicamos el contenido
          animation: 'scroll 20s linear infinite', // Animación continua
          '@keyframes scroll': {
            '0%': { transform: 'translateX(0)' },
            '100%': { transform: 'translateX(-50%)' }, // Mueve el 50% del ancho
          },
        }}
      >
        {/* Duplicamos los logos para efecto de loop */}
        {[...logos, ...logos].map((logo, index) => (
          <Paper
            sx={{
              bgcolor: theme.palette.secondary.light,
              mx: 1,
              borderRadius: 2
            }}
          >
            <Box
              key={index}
              component="img"
              src={logo}
              alt={`Logo ${index}`}
              sx={{
                height: 100,
                width: 'auto',
                margin: '0 20px',
                flexShrink: 0, // Evita que los logos se reduzcan
              }}
            />
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default LogoCarousel;
