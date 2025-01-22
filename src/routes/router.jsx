import { createBrowserRouter } from 'react-router-dom'
import Home from '../pages/Home/Home'
import MainLayout from '../layouts/MainLayout'


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
        ],
    },
    // { path: '/login', element: <Login /> },
    // { path: '/signup', element: <SignUp /> },

])