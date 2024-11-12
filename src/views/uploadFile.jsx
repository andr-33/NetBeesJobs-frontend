import { CloudUpload, Trash } from "lucide-react";
import { useRef, useState } from "react";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const UploadFileView = () =>{
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');
    const inputFileRef = useRef(null);

    const handleFileSelecction = () => {
        if(inputFileRef.current){
            inputFileRef.current.click();
        }
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];

        if(selectedFile.size > MAX_FILE_SIZE){
            setError('El archivo debe ser menos a 5MB');
            return;
        }
        setError('');
        setFile(selectedFile);
    };

    const handleRemoveFile = () => {
        setFile(null);
    };

    return(
        <div className="bg-orange-300 w-1/3">
            <h2 className="text-center">CV</h2>
            <div className="bg-orange-500 flex justify-center items-center h-full">
                <div className="flex flex-col items-center gap-2">
                    <CloudUpload className="w-10 h-10"/>
                    
                    {file ? (
                        <div>
                            <div className="flex flex-row gap-2 items-center">
                                <p className="font-semibold">{file.name}</p>
                                <button
                                    className="p-1 bg-slate-400 hover:bg-red-600 rounded-lg"
                                    onClick={handleRemoveFile}
                                >
                                    <Trash />
                                </button>
                            </div>
                            <button 
                                className="w-full py-3 mt-2 rounded-md bg-net-bees"
                            >
                                Subir CV
                            </button>
                        </div>
                    ):(
                        <>
                            <button 
                                className="px-5 py-3 rounded-md bg-net-bees"
                                onClick={handleFileSelecction}
                            >
                                Selecciona un archivo
                            </button>
                            {error && <p className="text-red-600">{error}</p>}
                        </>
                    )}
                    <input 
                        ref={inputFileRef}
                        type="file"
                        accept="application/pdf"
                        onChange={handleFileChange}
                        hidden
                    />
                </div>
            </div>
        </div>
    );
};

export default UploadFileView;