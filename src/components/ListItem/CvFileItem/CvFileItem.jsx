import { Box, ListItemButton, Typography } from "@mui/material";

const CvFileItem = ({fileName, uploadDate}) => {
    return(
        <ListItemButton 
            sx={{
                height: 75,
            }}
        >
            <Box sx={{
                minWidth: 50,
                height: '100%',
                borderTopLeftRadius: '12px',
                borderBottomLeftRadius: '12px',
                bgcolor: (theme) => theme.palette.error.light,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Typography
                    variant="body2"
                    sx={{
                        fontWeight: '400'
                    }}
                >
                    PDF
                </Typography>
            </Box>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 1,
                pl: 2,
                height: '100%',
                overflow: 'hidden',
            }}>
                <Typography 
                    variant="body1"
                    sx={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                    }}    
                >
                    {fileName}
                </Typography>
                <Typography 
                    variant="caption"
                    sx={{
                        color: (theme) => theme.palette.grey[600]
                    }}
                >
                    {`Subido el: ${uploadDate}`}
                </Typography>
            </Box>
        </ListItemButton>
    );
};

export default CvFileItem;