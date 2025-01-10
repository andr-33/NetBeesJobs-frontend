import { useAuth } from "../../contexts/AuthContext/AuthContext";
import { Navigate } from "react-router-dom"; 

const ProtectedRoute = ({ children }) => {
    const { accessToken, isInitialized } = useAuth();

    if(isInitialized){
        return null;
    }
    if(!accessToken){
        return <Navigate to='/autenticacion' replace />
    }

    return children;
};

export default ProtectedRoute;