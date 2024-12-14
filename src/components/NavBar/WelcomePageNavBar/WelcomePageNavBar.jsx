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

const NAV_ITEMS = ['Encuentra trabajo', 'Empleadores', 'Contacto'];

const WelcomePageNavBar = () => {
    return (
        <AppBar
            position="fixed"
            component='nav'
            sx={{
                bgcolor: '#FFFB',
                height: 80,
            }}
        >
            <Toolbar>
                <Box component='img' src="./images/LOGONETBEES.png" sx={{
                    width: 120,
                    height: 80
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
                        <Button variant="outlined" sx={{
                            bgcolor: 'transparent',
                            color: 'black',
                            borderColor: 'black',
                            borderRadius: 5,
                            transition: 'transform 0.3s ease-in-out',
                            ':hover': {
                                transform: 'scale(1.02)',
                            },
                        }}>Iniciar sesión</Button>
                        <Button variant="contained" sx={{
                            bgcolor: 'yellow',
                            color: 'black',
                            borderRadius: 5,
                            transition: 'transform 0.3s ease-in-out',
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