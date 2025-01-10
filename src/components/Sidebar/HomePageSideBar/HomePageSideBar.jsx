import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Box, useTheme } from "@mui/material";
import { PersonRounded, BusinessRounded, DescriptionRounded, LogoutRounded } from '@mui/icons-material';
import { useAuth } from "../../../contexts/AuthContext/AuthContext";

const HomePageSideBar = ({ expanded, setExpanded }) => {
    const menuItems = [
        { name: "Mi perfil", icon: <PersonRounded /> },
        { name: "Candidaturas", icon: <BusinessRounded /> },
        { name: "CVs", icon: <DescriptionRounded /> },
    ];

    const theme = useTheme();
    const { removeToken } = useAuth();

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: expanded ? 200 : 70,
                overflowX: 'hidden',
                position: 'absolute',
                zIndex: 5,
                "& .MuiDrawer-paper": {
                    width: expanded ? 200 : 70,
                    transition: "width 0.3s",
                    overflowX: 'hidden',
                    bgcolor: theme.palette.secondary.light,
                },
            }}
            onMouseEnter={() => setExpanded(true)}
            onMouseLeave={() => setExpanded(false)}
        >
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
            }}>
                <List>
                    {menuItems.map((item) => (
                        <ListItem key={item.name} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                {expanded && 
                                    <ListItemText 
                                        primary={item.name} 
                                        sx={{
                                            minWidth: 200,
                                        }} 
                                    />
                                }
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Box sx={{ 
                    flexGrow: 1, 
                    display: 'flex', 
                    alignItems: 'flex-end',
                    mb: 1,
                }}>
                    <ListItem disablePadding>
                        <ListItemButton onClick={removeToken}>
                            <ListItemIcon>
                               <LogoutRounded />
                            </ListItemIcon>
                            {expanded && 
                                <ListItemText 
                                    primary="Cerrar sesión"
                                    sx={{
                                        minWidth: 200,
                                    }} 
                                />
                            }
                        </ListItemButton>
                    </ListItem>
                </Box>
            </Box>
        </Drawer>
    );
};

export default HomePageSideBar;