import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import {PersonRounded, BusinessRounded, DescriptionRounded} from '@mui/icons-material';

const HomePageSideBar = ({ expanded, setExpanded }) => {
    const menuItems = [
        { name: "Mi perfil", icon: <PersonRounded /> },
        { name: "Candidaturas", icon: <BusinessRounded /> },
        { name: "CVs", icon: <DescriptionRounded /> },
    ];

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: expanded ? 200 : 70,
                "& .MuiDrawer-paper": {
                    width: expanded ? 200 : 70,
                    transition: "width 0.3s",
                },
                overflow: 'hidden'
            }}
            onMouseEnter={() => setExpanded(true)}
            onMouseLeave={() => setExpanded(false)}
        >
            <List>
                {menuItems.map((item) => (
                    <ListItem key={item.name} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            {expanded && <ListItemText primary={item.name} />}
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
};

export default HomePageSideBar;