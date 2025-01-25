import { createBrowserRouter } from 'react-router-dom'
import Home from '../pages/Home/Home'
import MainLayout from '../layouts/MainLayout'
import Login from '../pages/Login/Login'
import Register from '../pages/Register/Register'
import AvailableCamps from '../pages/AvailableCamps/AvailableCamps'
import Dashboard from '../pages/Dashboard/Dashboard'
import DashboardLayout from '../layouts/DashboardLayout'
import Profile from '../pages/Dashboard/common/profile'
import AdminRoute from './AdminRoute'
import PrivateRoute from './PrivateRoute'
import AddACamp from '../pages/Dashboard/Admin/AddACamp/AddACamp'
import ManageCamps from '../pages/Dashboard/Admin/ManageCamps/ManageCamps'


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
        element: <PrivateRoute>
            <DashboardLayout></DashboardLayout>
        </PrivateRoute>,
        children: [
            {
                path: '',
                element: <Dashboard></Dashboard>
            },
            {
                path: 'organizer-profile',
                element: <PrivateRoute>
                    <AdminRoute>
                        <Profile></Profile>
                    </AdminRoute>
                </PrivateRoute>
            },
            {
                path: 'add-camp',
                element: <PrivateRoute>
                    <AdminRoute>
                        <AddACamp></AddACamp>
                    </AdminRoute>
                </PrivateRoute>
            },
            {
                path: 'manage-camps',
                element: <PrivateRoute>
                    <AdminRoute>
                        <ManageCamps></ManageCamps>
                    </AdminRoute>
                </PrivateRoute>
            }
        ]
    }


])