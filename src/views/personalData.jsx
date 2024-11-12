import { IconButton } from "@mui/material";
import ProfileForm from "../components/forms/profileForm";
import { ChevronDown } from 'lucide-react';
import { useState } from "react";

const PersonalDataView = () =>{
    const [] = useState(false);
    return(
        <div className="bg-purple-300 flex-grow">
            <h2 className="text-center">Datos personales</h2>
            <div className="flex flex-row items-center ml-3">
                <p>Datos personales</p>
                <IconButton>
                    <ChevronDown />
                </IconButton>
            </div>
            <ProfileForm />
        </div>
    );
};

export default PersonalDataView;