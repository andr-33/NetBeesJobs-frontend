import React, { useState } from 'react';
import { Box, IconButton, useTheme } from '@mui/material';
import { PhotoCamera, Delete } from '@mui/icons-material';
import { useImageProfile } from '../../../contexts/ImageProfileContext/ImageProfileContext';

const PhotoPicker = () => {
    const [image, setImage] = useState(null);
    const theme = useTheme();
    const { setSelectedImage } = useImageProfile();

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImage(e.target.result);
                setSelectedImage(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleClearImage = () => {
        setImage(null);
        setSelectedImage(null);
    };

    return (
        <Box
            sx={{
                position: 'relative',
                width: 140,
                height: 140,
                borderRadius: '50%',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px dashed #ccc',
                mx: 'auto',
                my: 2
            }}
        >
            {image ? (
                <>
                    <Box
                        component="img"
                        src={image}
                        alt="Selected"
                        sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: '50%',
                        }}
                    />
                    <IconButton
                        aria-label="delete"
                        onClick={handleClearImage}
                        sx={{
                            position: 'absolute',
                            zIndex: 1,
                        }}
                    >
                        <Delete 
                            fontSize='medium' 
                            sx={{
                                color: `${theme.palette.error.main}CC`
                            }}
                        />
                    </IconButton>
                </>
            ) : (
                <>
                    <IconButton
                        component="label"
                        sx={{
                            p: 2,
                            borderRadius: '50%',
                        }}
                    >
                        <PhotoCamera fontSize="medium" />
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            hidden
                        />
                    </IconButton>
                </>
            )}
        </Box>
    );
};

export default PhotoPicker;
