import { Navigate } from "react-router-dom";
export default function ProtectedRoute({element}){
    const isAuthenticated = !!localStorage.getItem("authToken");
    if(isAuthenticated){
        return element;
    }
    return <Navigate to = "/login"/>
}