import { 
    Typography, 
    Paper,
    IconButton,
    Box,
    useTheme
} from "@mui/material";
import { DeleteOutlineRounded, EditOutlined } from "@mui/icons-material";

const OfferCard = ({
    name,
    project,
    handleEditOffer
}) => {

    const theme = useTheme();
    return (
        <Paper
            elevation={3}
            sx={{
                height: 150,
                borderRadius: 3,
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
            }}
        >
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                width: '100%',
                mt: 0.5
            }}>
                <IconButton sx={{
                    ":hover": {
                        color: theme.palette.error.main
                    }
                }}>
                    <DeleteOutlineRounded />
                </IconButton>
                <IconButton
                    onClick={handleEditOffer}
                    sx={{
                        ":hover": {
                            color: theme.palette.success.main
                        }
                    }}
                >
                    <EditOutlined />
                </IconButton>
            </Box>
            <Typography
                variant="body1"
                sx={{
                    ml: 1
                }}
            >
                {name}
            </Typography>
            <Typography
                variant="body2"
                sx={{
                    fontWeight: '600',
                    ml: 1
                }}
            >
                Proyecto:
                <Typography
                    variant="body2"
                    component={'span'}
                >
                    &nbsp;{project}
                </Typography>
            </Typography>
        </Paper>
    );
}

export default OfferCard;