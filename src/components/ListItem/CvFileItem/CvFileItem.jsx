import { Box, Divider, Radio, Typography } from "@mui/material";

const CvFileItem = ({ fileName, uploadDate, isSelected, onSelect }) => {

    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        const formattedDate = new Intl.DateTimeFormat('es-ES', options).format(date);

        return formattedDate.replace('.', '.');
    }

    return (
        <Box
            component={'div'}
            sx={{
                height: 75,
                border: '1px solid #AAAD',
                display: 'flex',
                flexDirection: 'row',
                borderRadius: '8px',
                overflow: 'hidden',
                cursor: 'pointer'
            }}
            onClick={onSelect}
        >
            <Box sx={{
                minWidth: 50,
                height: '100%',
                bgcolor: (theme) => theme.palette.error.light,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Typography
                    variant="body2"
                    sx={{
                        fontWeight: '600'
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
                justifyContent: 'center'
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
                    {`Subido el: ${formatDate(uploadDate)}`}
                </Typography>
            </Box>
            <Divider orientation="vertical"/>
            <Box sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
            }}>
                <Radio checked={isSelected} color="success"/>
            </Box>
        </Box>
    );
};

export default CvFileItem;