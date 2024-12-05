import Layout from "./Layout";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import HomePage from "./components/home/Home";
import GiveForAdoption from "./components/adoption/Adoption";
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
        element: <HomePage/>,
    },
    {
        path: "/adoption",
        element: <GiveForAdoption/>
    }
];