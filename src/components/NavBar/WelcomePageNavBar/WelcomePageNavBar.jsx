import { 
    AppBar, 
    Box, 
    Button, 
    List, 
    ListItem, 
    ListItemButton, 
    ListItemText, 
    Toolbar 
} from "@mui/material";
import { useTheme} from '@mui/material';
import { useNavigate } from "react-router-dom";

const NAV_ITEMS = ['Encuentra trabajo', 'Empleadores', 'Contacto'];

const WelcomePageNavBar = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    return (
        <AppBar
            position="fixed"
            component='nav'
            sx={{
                bgcolor: theme.palette.background.paper,
                height: 80,
            }}
        >
            <Toolbar>
                <Box component='img' src="./logos/netbees-logo.png" sx={{
                    width: 152,
                    height: 121
                }} />

                <Box sx={{
                    marginLeft: 'auto',
                    display: 'flex',
                    flexDirection: 'row'
                }} >
                    <List
                        disablePadding
                        sx={{
                            display: 'flex',
                            flexDirection: 'row'
                        }}
                    >
                        {NAV_ITEMS.map((item, index) => (
                            <ListItem key={index} disablePadding>
                                <ListItemButton sx={{
                                    width: 'auto',
                                    ':hover': {
                                        color: 'yellowgreen'
                                    }
                                }}>
                                    <ListItemText primary={item} sx={{
                                        color: 'black',
                                    }} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 2,
                        alignItems: 'center'
                    }}>
                        <Button variant="outlined" 
                            sx={{
                                bgcolor: 'transparent',
                                color: 'black',
                                borderColor: 'black',
                                borderRadius: 5,
                                transition: 'transform 0.1s ease-in-out',
                                ':hover': {
                                    transform: 'scale(1.02)',
                                },
                            }}
                            onClick={()=>{ navigate('/authentication')}}
                        >
                            Iniciar sesión
                        </Button>
                        <Button variant="contained" sx={{
                            bgcolor: theme.palette.primary.main,
                            color: 'black',
                            borderRadius: 5,
                            transition: 'transform 0.1s ease-in-out',
                            ':hover': {
                                transform: 'scale(1.02)',
                            },
                        }}>Publicar oferta</Button>
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default WelcomePageNavBar;