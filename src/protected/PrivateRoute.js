import { Navigate } from "react-router-dom";
import { useAuth } from "../context/auth/authContext";

const PrivateRoutes = ({children}) => {

    const {isAuthenticated} = useAuth()

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    return children;
};

export default PrivateRoutes;