import { createBrowserRouter } from 'react-router-dom'
import Home from '../pages/Home/Home'
import MainLayout from '../layouts/MainLayout'
import Login from '../pages/Login/Login'
import Register from '../pages/Register/Register'
import AvailableCamps from '../pages/AvailableCamps/AvailableCamps'
import Dashboard from '../pages/Dashboard/Dashboard'


export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        // errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: 'available-camps',
                element: <AvailableCamps></AvailableCamps>
            },

            {
                path: 'login',
                element: <Login></Login>
            },
            {
                path: 'register',
                element: <Register></Register>
            },
        ],
    },
    {
        path: 'dashboard',
        element: <Dashboard></Dashboard>,
    }


])