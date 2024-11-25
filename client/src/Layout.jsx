import {Link, Outlet} from "react-router-dom";
export default function Layout(){
    return(
        <>
            <Outlet/>
            <Link to = "/login">Login</Link>
            <Link to = "/signup">Signup</Link>
            </>
    )
}