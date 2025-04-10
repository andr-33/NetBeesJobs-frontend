import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Box, useTheme } from "@mui/material";
import { InsertDriveFileRounded, InventoryRounded, LogoutRounded, HomeRounded } from '@mui/icons-material';
import { useAuth } from '../../../contexts/AuthContext/AuthContext';
import { useNavigate } from "react-router-dom";

const UserSideBar = ({ expanded, setExpanded, setActiveSection }) => {
    const menuItems = [
        { id: 'cvs', name: "Mis CVs", icon: <InsertDriveFileRounded /> },
        { id: 'registers', name: "Candidaturas", icon: <InventoryRounded /> },
    ];

    const theme = useTheme();
    const navigate = useNavigate();
    const { removeToken } = useAuth();

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: expanded ? 200 : 50,
                overflowX: 'hidden',
                position: 'absolute',
                zIndex: 5,
                "& .MuiDrawer-paper": {
                    width: expanded ? 200 : 50,
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
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => navigate('/pagina-principal')}>
                            <ListItemIcon><HomeRounded /></ListItemIcon>
                            {expanded &&
                                <ListItemText
                                    primary="Inicio"
                                    sx={{
                                        minWidth: 200,
                                    }}
                                />
                            }
                        </ListItemButton>
                    </ListItem>
                    {menuItems.map((item) => (
                        <ListItem key={item.name} disablePadding>
                            <ListItemButton
                                onClick={() => setActiveSection(item.id)}
                            >
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

export default UserSideBar;