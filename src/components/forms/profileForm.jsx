import React from 'react';
import { TextField, Button, Box } from '@mui/material';

function Formulario() {
  return (
    <Box className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <form className="space-y-3">
        <TextField 
            label="Nombre" 
            variant="outlined" 
            fullWidth 
            className="text-sm bg-gray-100 text-gray-700 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
        />
        <TextField 
            label="Primer Apellido" 
            variant="outlined" 
            fullWidth 
            className="text-sm bg-gray-100 text-gray-700 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
        />
        <TextField 
            label="Segundo Apellido" 
            variant="outlined" 
            fullWidth 
            className="text-sm bg-gray-100 text-gray-700 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
        />
        <TextField 
            label="Fecha de Nacimiento" 
            type="date" 
            variant="outlined" 
            fullWidth
            className="bg-gray-100 text-gray-700 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            InputLabelProps={{
              shrink: true,
            }}
        />
        <TextField 
            label="Número de Documento" 
            variant="outlined" 
            fullWidth 
            className="text-sm bg-gray-100 text-gray-700 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
        />
        <TextField 
            label="Código Postal" 
            variant="outlined" 
            fullWidth 
            className="text-sm bg-gray-100 text-gray-700 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
        />        
        <TextField 
            label="Teléfono" 
            variant="outlined" 
            fullWidth 
            className="text-sm bg-gray-100 text-gray-700 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
        />
        <div className="mt-6">
          <Button 
            variant="contained" 
            color="primary"
            fullWidth
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md"
          >
            Enviar
          </Button>
        </div>
      </form>
    </Box>
  );
}

export default Formulario;
