import React from 'react';
import { Box, Paper, useTheme } from '@mui/material';

const logos = [
  './logos/blacked/borygo-logo-bk.png',
  './logos/blacked/boryszew-logo-bk.png',
  './logos/blacked/gira-logo-bk.png',
  './logos/blacked/maflow-logo-bk.png',
  './logos/blacked/netbees-logo-bk.png',
  './logos/blacked/tim-logo-bk.png',
  './logos/blacked/vanitas-logo-bk.png',
];

const LogoCarousel = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        overflow: 'hidden',
        width: '100%',
        position: 'relative',
        backgroundColor: theme.palette.background.default,
        py:2
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
          <Box
            
            sx={{
              mx: 1,
              borderRadius: 2
            }}
            key={index}
          >
            <Box
              key={index}
              component="img"
              src={logo}
              alt={`Logo ${index}`}
              sx={{
                height: 300,
                width: 212,
                margin: '0 20px',
                flexShrink: 0, // Evita que los logos se reduzcan
              }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default LogoCarousel;
