import { Divider, ListItem, ListItemButton, ListItemText, useTheme } from "@mui/material";
import { useState } from "react";

const NavBarItem = ({ label, handleOnClick }) => {
    const [hoverText, setHoverText] = useState(false);
    const theme = useTheme();

    return (
        <ListItem disablePadding>
            <ListItemButton
                sx={{
                    width: 'auto',
                    borderRadius: 3,
                    mx: 0.5
                }}
                onClick={handleOnClick}
                onMouseEnter={() => setHoverText(true)}
                onMouseLeave={() => setHoverText(false)}
            >
                <ListItemText
                    primary={label}
                    sx={{
                        color: hoverText ? 'black' : theme.palette.secondary.dark,
                        whiteSpace: 'nowrap',
                        textAlign: 'center',
                    }}
                />
            </ListItemButton>
            <Divider orientation="vertical" />
        </ListItem>
    );
};

export default NavBarItem;