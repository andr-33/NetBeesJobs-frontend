import { useAuth } from "../../contexts/AuthContext/AuthContext";
import { Navigate } from "react-router-dom"; 

const ProtectedRoute = ({ children }) => {
    const { accessToken } = useAuth();
    console.log(accessToken);
    if(!accessToken){
        return <Navigate to='/authentication' replace />
    }

    return children;
};

export default ProtectedRoute;