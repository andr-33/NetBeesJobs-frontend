import { Button } from "@mui/material";
import { DownloadRounded } from "@mui/icons-material";

const DownloadButton = ({text, fileUrl, fileName}) => {

    const handleDownloadFile = async () => {
        try{
            const response = await fetch(fileUrl, {
                headers: {
                    'Content-Type': 'application/pdf',
                }
            });
            const blob = await response.blob();
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = fileName || 'CV_Documento.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    return (
        <Button
            variant="contained"
            color="primary"
            startIcon={<DownloadRounded />}
            onClick={handleDownloadFile}
            fullWidth
        >
            {text}
        </Button>
    );
};

export default DownloadButton;