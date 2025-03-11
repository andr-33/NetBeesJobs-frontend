import { AppBar, Box, Button, List, Toolbar } from "@mui/material";
import { useTheme } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import NavBarItem from "../../ListItem/NavBarItem/NavBarItem";

const NAV_ITEMS = ['Colaboradores', 'Contacto', 'Iniciar sesión'];

const WelcomePageNavBar = ({ onScrollToSection }) => {
    const [isVibrating, setIsVibrating] = useState(false);
    const theme = useTheme();
    const navigate = useNavigate();

    useState(() => {
        const interval = setInterval(() => {
            setIsVibrating(true);
            setTimeout(() => setIsVibrating(false), 700);
        }, 2500);

        return () => clearInterval(interval);
    }, []);

    return (
        <AppBar position="fixed" component='nav' sx={{ bgcolor: theme.palette.background.paper, height: 80 }}>
            <Toolbar>
                <Box component='img' src="./logos/netbees-logo.png" sx={{ width: 152, height: 121 }} />
                <Box sx={{ marginLeft: 'auto', display: 'flex', flexDirection: 'row', gap: 1 }}>
                    <List disablePadding sx={{ display: 'flex', flexDirection: 'row' }}>
                        {NAV_ITEMS.map((item, index) => (
                            <NavBarItem 
                                key={index}
                                label={item}
                                handleOnClick={()=> index === 2 ?
                                    navigate('/autenticacion') :
                                    onScrollToSection(item.toLowerCase())
                                }
                            />
                        ))}
                    </List>
                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, alignItems: 'center' }}>

                        <Button
                            variant="outlined"
                            sx={{ 
                                bgcolor: 'transparent', 
                                color: 'black', 
                                borderColor: 'black', 
                                borderRadius: 3, 
                                transition: 'transform 0.1s ease-in-out', 
                                ':hover': { transform: 'scale(1.02)' } }
                            }
                            onClick={() => navigate('/perfil-empresa')}
                        >
                            Publicar oferta
                        </Button>
                        <Button
                            variant="contained"
                            sx={{
                                bgcolor: theme.palette.primary.main,
                                color: 'black',
                                borderRadius: 3,
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
