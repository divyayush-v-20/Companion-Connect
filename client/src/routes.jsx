import Layout from "./Layout";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import Home from "./components/home/Home";
export const routes = [
    {
        path: "/",
        element: <Layout/>,
        children: [
            {
                path: "/login",
                element: <Login/>
            },
            {
                path: "/signup",
                element: <Signup/>
            }
        ]
    },
    {
        path: "/home",
        element: <Home/>
    }
];