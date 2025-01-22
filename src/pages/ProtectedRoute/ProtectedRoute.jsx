import { useAuth } from "../../contexts/AuthContext/AuthContext";
import { Navigate, Outlet } from "react-router-dom"; 

const ProtectedRoute = () => {
    const { accessToken, isInitialized } = useAuth();

    if(isInitialized){
        return null;
    }
    if(!accessToken){
        return <Navigate to='/autenticacion' replace />
    }

    return <Outlet />;
};

export default ProtectedRoute;