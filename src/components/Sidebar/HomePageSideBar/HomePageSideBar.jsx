import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, useTheme } from "@mui/material";
import {PersonRounded, BusinessRounded, DescriptionRounded} from '@mui/icons-material';

const HomePageSideBar = ({ expanded, setExpanded }) => {
    const menuItems = [
        { name: "Mi perfil", icon: <PersonRounded /> },
        { name: "Candidaturas", icon: <BusinessRounded /> },
        { name: "CVs", icon: <DescriptionRounded /> },
    ];

    const theme = useTheme();

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
            <List>
                {menuItems.map((item) => (
                    <ListItem key={item.name} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            {expanded && <ListItemText primary={item.name} sx={{
                                minWidth: 200,
                            }} />}
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
};

export default HomePageSideBar;