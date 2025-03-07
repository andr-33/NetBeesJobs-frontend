import {
    Box,
    IconButton,
    List,
    ListItem,
    TextField,
    Typography,
    useTheme
} from "@mui/material";
import { AddCircleOutlineRounded, DeleteRounded } from "@mui/icons-material";

const TextDynamicList = ({ title, items, setItems }) => {
    const theme = useTheme();

    const handleAddItem = () => {
        setItems([...items, ""]);
    };

    const handleUpdateItem = (value, itemIndex) => {
        const updatedList = items.map((item, index) =>
            index === itemIndex ? value : item
        );
        setItems(updatedList);
    };

    const handleDeleteItem = (itemIndex) => {
        const updatedList = items.filter((_, index) => index !== itemIndex);
        setItems(updatedList.length === 0 ? [""] : updatedList);
    };

    return (
        <Box>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                mb: 1
            }}>
                <Typography variant="h6">{title}</Typography>
                <IconButton
                    size="small"
                    onClick={handleAddItem}
                    sx={{
                        ":hover": {
                            color: theme.palette.success.main
                        }
                    }}
                >
                    <AddCircleOutlineRounded />
                </IconButton>
            </Box>

            <List disablePadding>
                {items.map((item, index) => (
                    <ListItem
                        disableGutters
                        key={index}
                        sx={{ py: 1 }}
                        secondaryAction={
                            <IconButton
                                onClick={() => handleDeleteItem(index)}
                                sx={{
                                    ":hover": {
                                        color: theme.palette.error.main
                                    }
                                }}
                            >
                                <DeleteRounded fontSize="small" />
                            </IconButton>
                        }
                    >
                        <TextField
                            value={item}
                            placeholder={`Requisito no. ${index + 1}`}
                            onChange={(e) => handleUpdateItem(e.target.value, index)}
                            fullWidth
                        />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default TextDynamicList;