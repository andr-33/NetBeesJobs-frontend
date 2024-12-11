import { AppBar, Box, Button, List, ListItem, ListItemButton, ListItemText, Toolbar, Typography } from "@mui/material";

const NAV_ITEMS = ['Encuentra trabajo', 'Empleadores', 'Contacto'];

const WelcomePage = () => {
  return (
    <Box sx={{
        width: '100%',
        height: '100vh'
    }}>
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
                }}/>

                <Box sx={{
                    marginLeft:'auto',
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
                                    width:'auto',
                                    ':hover':{
                                        color: 'yellowgreen'
                                    }
                                }}>
                                    <ListItemText primary={item} sx={{
                                        color: 'black',
                                    }}/>
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

        <Box sx={{
            width: '100%',
            height: '100%',
            bgcolor: 'greenyellow',
            display: 'flex',
            flexDirection: 'row'
        }}>
            <Box sx={{
                width: '50%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Box 
                    component='img'
                    src="./images/funny.gif"
                    sx={{
                        width: 200,
                        height: 200,
                    }}
                />
            </Box>
            <Box sx={{
                width: '50%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Typography sx={{
                    fontSize: 40,
                }}>
                    Más de
                    <Box   
                        sx={{
                            fontWeight: '900',
                            color: 'yellow',
                            fontSize: 50,
                            mx: 0.5
                        }} 
                        component='span'
                    >
                        500
                    </Box>
                    ofertas de empleo se mueren por conocer tu CV 
                </Typography>
            </Box>
        </Box>

    </Box>
  );
};

export default WelcomePage;
