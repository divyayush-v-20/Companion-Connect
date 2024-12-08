import Layout from "./Layout";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import HomePage from "./components/home/Home";
import GiveForAdoption from "./components/adoption/Adoption";
import ProtectedRoute from "./routeProtection";
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
        element: <ProtectedRoute element={<HomePage />} />,
    },
    {
        path: "/adoption",
        element: <ProtectedRoute element={<GiveForAdoption />} />,
    }
];