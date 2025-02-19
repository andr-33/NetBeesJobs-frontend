import { AppBar, Box, Button, List, ListItem, ListItemButton, ListItemText, Toolbar } from "@mui/material";
import { useTheme } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';

const NAV_ITEMS = ['Colaboradores', 'Contacto'];

const WelcomePageNavBar = ({ onScrollToSection }) => {
    const [isVibrating, setIsVibrating] = useState(false); 
    const theme = useTheme();
    const navigate = useNavigate();

    useState(()=>{
        const interval = setInterval(()=> {
            setIsVibrating(true);
            setTimeout(()=> setIsVibrating(false), 700);
        }, 2500);

        return () => clearInterval(interval);
    },[]);

    return (
        <AppBar position="fixed" component='nav' sx={{ bgcolor: theme.palette.background.paper, height: 80 }}>
            <Toolbar>
                <Box component='img' src="./logos/netbees-logo.png" sx={{ width: 152, height: 121 }} />
                <Box sx={{ marginLeft: 'auto', display: 'flex', flexDirection: 'row', gap: 1 }}>
                    <List disablePadding sx={{ display: 'flex', flexDirection: 'row' }}>
                        {NAV_ITEMS.map((item, index) => (
                            <ListItem key={index} disablePadding>
                                <ListItemButton
                                    sx={{
                                        width: 'auto',
                                        ':hover': {
                                            color: 'yellowgreen'
                                        }
                                    }}
                                    onClick={() => onScrollToSection(item.toLowerCase())}
                                >
                                    <ListItemText 
                                        primary={item} 
                                        sx={{ 
                                            color: 'black', 
                                            whiteSpace: 'nowrap',
                                            textAlign: 'center',
                                        }} 
                                    />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, alignItems: 'center' }}>
                        <Button 
                            variant="outlined" 
                            sx={{ bgcolor: 'transparent', color: 'black', borderColor: 'black', borderRadius: 5, transition: 'transform 0.1s ease-in-out', ':hover': { transform: 'scale(1.02)' } }} 
                            onClick={() => navigate('/autenticacion')}
                        >
                            Iniciar sesión
                        </Button>
                        <Button 
                            variant="contained" 
                            sx={{ bgcolor: theme.palette.primary.main, color: 'black', borderRadius: 5, transition: 'transform 0.1s ease-in-out', ':hover': { transform: 'scale(1.02)' } }}
                            onClick={() => navigate('/perfil-empresa')}
                        >
                            Publicar oferta
                        </Button>
                        <Button 
                            variant="contained" 
                            sx={{ 
                                bgcolor: theme.palette.primary.main, 
                                color: 'black', 
                                borderRadius: 5, 
                                transition: 'transform 0.1s ease-in-out', 
                                ':hover': { transform: 'scale(1.02)' }, 
                                animation: isVibrating ? 'vibration 0.4s ease-in-out' : 'none'
                            }}
                            onClick={() => navigate('/pagina-principal')}
                        >
                            Encuentra trabajo
                        </Button>
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default WelcomePageNavBar;
