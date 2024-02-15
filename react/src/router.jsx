import { Navigate, createBrowserRouter } from "react-router-dom";
import GuestLayout from "./components/GuestLayout";
import Dashboard from "./views/Dashboard";
import Surveys from "./views/Surveys";
import Login from './views/Login'
import Signup from './views/Signup'
import DefaultLayout from "./components/DefaultLayout";

const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <DefaultLayout />,
            children: [
                {
                    path: '/surveys',
                    element: <Surveys />
                },
                {
                    path: '/dashboard',
                    element: <Navigate to='/' />
                },
                {
                    path: '/',
                    element: <Dashboard />
                },
            ]

        },
       
        {
            path: '/',
            element: <GuestLayout />,
            children: [
                {
                    path: '/login',
                    element: <Login />
                },
                {
                    path: '/signup',
                    element: <Signup />
                }
            ]
        }
        
    ]
)

export default router;