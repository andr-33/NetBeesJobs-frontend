import React from 'react';
import { Box, Typography, Divider, Link, IconButton, useTheme } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import PublicIcon from '@mui/icons-material/Public';

const WelcomePageFooter = () => {
  const theme = useTheme();

  return (
    <Box sx={{...style.container, bgcolor: theme.palette.text.primary}}>
      <Box sx={style.rowSpacing}>
        <Box sx={style.column}>
          <Typography sx={style.heading}>PRODUCTOS</Typography>
          <Divider sx={{...style.divider, bgcolor: theme.palette.primary.main}} />
          <Link href="https://www.netbees.es/empresas-outsourcing-de-it-en-cantabria/" sx={style.text}>
            <Typography sx={style.text}>Outsourcing de IT</Typography>
          </Link>
          <Link href="https://www.netbees.es/licitaciones-publicas/" sx={style.text}>
            <Typography sx={style.text}>Licitaciones Públicas</Typography>
          </Link>
          <Link href="https://www.netbees.es/centro-de-coworking-en-cantabria/" sx={style.text}>
            <Typography sx={style.text}>Coworking</Typography>
          </Link>
          <Link href="https://www.netbees.es/marketing-digital/" sx={style.text}>
            <Typography sx={style.text}>Marketing Digital</Typography>
          </Link>
          <Link href="https://www.netbees.es/formacion/" sx={style.text}>
            <Typography sx={style.text}>Formación</Typography>
          </Link>
        </Box>


        <Box>
          <Typography sx={style.heading}>NETBEES</Typography>
          <Divider sx={{...style.divider, bgcolor: theme.palette.primary.main}} />
          <Typography sx={style.text}>Valores Corporativos</Typography>
          <Typography sx={style.text}>Tecnología e Innovación</Typography>
          <Typography sx={style.text}>Sistema de gestión y Calidad</Typography>
          <Typography sx={style.text}>Recursos Humanos</Typography>
        </Box>

        <Box>
          <Typography sx={style.heading}>CONTACTO</Typography>
          <Divider sx={{...style.divider, bgcolor: theme.palette.primary.main}} />
          <Box sx={style.decoratedText}>
            <PhoneIcon sx={style.icon} />
            <Typography sx={style.text}>673 03 25 61</Typography>
          </Box>
          <Box sx={style.decoratedText}>
            <EmailIcon sx={style.icon} />
            <Typography sx={style.text}>netbeesbc@gmail.com</Typography>
          </Box>
          <Divider sx={{...style.divider, bgcolor: theme.palette.primary.main}} />
          <Box sx={{ ...style.iconRow, ...style.centerItems }}>
            <IconButton href="https://www.instagram.com/netbeeslab?igsh=NnlwNDhucG1mdnI3">
              <InstagramIcon sx={style.icon} />
            </IconButton>
            <IconButton href="https://www.linkedin.com/company/netbees-business-center/">
              <LinkedInIcon sx={style.icon} />
            </IconButton>
            <IconButton>
              <FacebookIcon sx={style.icon} />
            </IconButton>
            <IconButton href="https://www.netbees.es/">
              <PublicIcon sx={style.icon} />
            </IconButton>
          </Box>
        </Box>
      </Box>

      <Box sx={style.row}>
        <Typography sx={{...style.textInfo, color: theme.palette.secondary.main}}>
          ©2025 NetBees Business Center. Todos los derechos reservados.
        </Typography>
        <Typography sx={{...style.textInfo, color: theme.palette.secondary.main}}>
          Polígono Industrial de Guarnizo, 0 S/N, 39611 Guarnizo, Cantabria
        </Typography>
      </Box>
    </Box>
  );
};

const style = {
  container: {
    padding: '20px',
    width: '100%'
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    px: 5
  },
  column: {
    display: 'flex',
    flexDirection: 'column'
  },
  rowSpacing: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    marginBottom: '20px',
  },
  heading: {
    color: '#fff',
    marginBottom: '10px',
    fontWeight: 'bold',
  },
  text: {
    color: '#fff',
    marginBottom: '3px',
  },
  iconRow: {
    display: 'flex',
    marginTop: '10px',
    gap: '10px',
  },
  icon: {
    color: '#fff',
    fontSize: '20px',
  },
  decoratedText: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  },
  divider: {
    marginBottom: '10px',
    height: '2px',
  },
  textInfo: {
    marginTop: '10px',
  },
  centerItems: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default WelcomePageFooter;
