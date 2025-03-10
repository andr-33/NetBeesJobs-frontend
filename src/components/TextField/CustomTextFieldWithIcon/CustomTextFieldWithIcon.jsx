import React from 'react';
import { TextField, InputAdornment, useTheme } from '@mui/material';

const CustomTextFieldWithIcon = ({
    label,
    name,
    type,
    value,
    onChange,
    required = false,
    multiline = false,
    rows = 0,
    icon: Icon,
    placeholder,
}) => {
    const theme = useTheme();
    return (
        <TextField
            label={label}
            name={name}
            type={type}
            variant="outlined"
            fullWidth
            value={value}
            onChange={onChange}
            required={required}
            multiline={multiline}
            placeholder={placeholder}
            rows={rows}
            sx={{
                mb: 2,
            }}
            slotProps={{
                inputLabel: {
                    color: theme.palette.text.primary,
                },
                input: {
                    startAdornment: Icon && (
                        <InputAdornment position="start">
                            <Icon sx={{ color: theme.palette.secondary.main }} />
                        </InputAdornment>
                    )
                }
            }}
        />
    );
};

export default CustomTextFieldWithIcon;
