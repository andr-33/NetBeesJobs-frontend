import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';

// Componente NavBar
function SeccionNavBar() {
  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#1976d2' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          JobFinder
        </Typography>
        <Button color="inherit">Iniciar Sesión</Button>
        <Button color="inherit">Registrarse</Button>
      </Toolbar>
    </AppBar>
  );
}

// Componente para cada sección
function SectionPage({ title, content, bgColor }) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: bgColor,
        scrollSnapAlign: 'start',
      }}
    >
      <Typography variant="h3" sx={{ mb: 2 }}>
        {title}
      </Typography>
      <Typography variant="body1" sx={{ textAlign: 'center', maxWidth: '600px' }}>
        {content}
      </Typography>
    </Box>
  );
}

// Componente Footer
function SectionFooter() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#333',
        color: 'white',
        scrollSnapAlign: 'start',
      }}
    >
      <Typography variant="h6">JobFinder © 2024</Typography>
      <Typography variant="body2">Todos los derechos reservados.</Typography>
    </Box>
  );
}

// Página Principal
function ExamplePage() {
  return (
    <Box
      sx={{
        scrollSnapType: 'y mandatory',
        overflowY: 'scroll',
        maxHeight: '100vh',
        p: 0,
      }}
    >
      <SeccionNavBar />
      <SectionPage
        title="Encuentra tu trabajo ideal"
        content="Nuestra plataforma conecta empresas y candidatos de forma rápida y eficiente."
        bgColor="#f5f5f5"
      />
      <SectionPage
        title="Publica Ofertas de Trabajo"
        content="Empresas pueden publicar ofertas de empleo y gestionar candidatos desde un solo lugar."
        bgColor="#e0f7fa"
      />
      <SectionPage
        title="Únete a una red profesional"
        content="Descubre oportunidades y amplía tu red profesional con facilidad."
        bgColor="#fffde7"
      />
      <SectionFooter />
    </Box>
  );
}

export default ExamplePage;

