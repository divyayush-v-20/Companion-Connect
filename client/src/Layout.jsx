import {Outlet, useLocation} from "react-router-dom";
import { useState, useEffect } from "react";
import LandingPage from "./components/landing/Landing";
export default function Layout(){
    const location = useLocation();
    const [isAuthPage, setIsAuthPage] = useState(false);

    useEffect(() => {
        setIsAuthPage(location.pathname === '/login' || location.pathname === '/signup');
    }, [location]);

    return (
        <>
            {!isAuthPage && <LandingPage />}
            <Outlet />
        </>
    );
}