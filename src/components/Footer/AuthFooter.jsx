import React from 'react';
import { Box, Typography, Divider, Link, IconButton } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import PublicIcon from '@mui/icons-material/Public';

const style = {
  container: {
    backgroundColor: '#000',
    padding: '20px',
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
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
    marginBottom: '5px',
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
    backgroundColor: '#1976d2',
    height: '2px',
  },
  textInfo: {
    marginTop: '10px',
    color: '#9e9e9e',
  },
  centerItems: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

const AuthFooter = () => {
  return (
    <Box sx={style.container}>
      <Box sx={style.rowSpacing}>
        <Box>
          <Typography sx={style.heading}>PRODUCTOS</Typography>
          <Divider sx={style.divider} />
          <Link href="https://www.netbees.es/empresas-outsourcing-de-it-en-cantabria/" sx={style.text}>
            Outsourcing de IT
          </Link>
          <Link href="https://www.netbees.es/licitaciones-publicas/" sx={style.text}>
            Licitaciones Públicas
          </Link>
          <Link href="https://www.netbees.es/centro-de-coworking-en-cantabria/" sx={style.text}>
            Coworking
          </Link>
          <Link href="https://www.netbees.es/marketing-digital/" sx={style.text}>
            Marketing Digital
          </Link>
          <Link href="https://www.netbees.es/formacion/" sx={style.text}>
            Formación
          </Link>
          <Typography sx={style.text}>I+D / IA</Typography>
        </Box>

        <Box>
          <Typography sx={style.heading}>NETBEES</Typography>
          <Divider sx={style.divider} />
          <Typography sx={style.text}>Valores Corporativos</Typography>
          <Typography sx={style.text}>Tecnología e Innovación</Typography>
          <Typography sx={style.text}>Sistema de gestión y Calidad</Typography>
          <Typography sx={style.text}>Recursos Humanos</Typography>
        </Box>

        <Box>
          <Typography sx={style.heading}>CONTACTO</Typography>
          <Divider sx={style.divider} />
          <Box sx={style.decoratedText}>
            <PhoneIcon sx={style.icon} />
            <Typography sx={style.text}>673 03 25 61</Typography>
          </Box>
          <Box sx={style.decoratedText}>
            <EmailIcon sx={style.icon} />
            <Typography sx={style.text}>netbeesbc@gmail.com</Typography>
          </Box>
          <Divider sx={style.divider} />
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
        <Typography sx={style.textInfo}>
          ©2025 NetBees Business Center. Todos los derechos reservados.
        </Typography>
        <Typography sx={style.textInfo}>
          Polígono Industrial de Guarnizo, 0 S/N, 39611 Guarnizo, Cantabria
        </Typography>
      </Box>
    </Box>
  );
};

export default AuthFooter;
