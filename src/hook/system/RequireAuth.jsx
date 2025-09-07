import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const RequireAuth = ({ children }) => {
    const { isAuthenticated } = useAuth();  
    const navigate = useNavigate();        

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    return children;
};

export default RequireAuth;

