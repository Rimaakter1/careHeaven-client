import { createBrowserRouter } from 'react-router-dom'
import Home from '../pages/Home/Home'
import MainLayout from '../layouts/MainLayout'
import Login from '../pages/Login/Login'
import Register from '../pages/Register/Register'
import AvailableCamps from '../pages/AvailableCamps/AvailableCamps'
import DashboardLayout from '../layouts/DashboardLayout'
import Profile from '../pages/Dashboard/common/profile'
import AdminRoute from './AdminRoute'
import PrivateRoute from './PrivateRoute'
import AddACamp from '../pages/Dashboard/Admin/AddACamp/AddACamp'
import ManageCamps from '../pages/Dashboard/Admin/ManageCamps/ManageCamps'
import UpdateCamp from '../pages/Dashboard/Admin/UpdateCamp/UpdateCamp'
import CampDetails from '../pages/CampDetails/CampDetails'
import ErrorPage from '../pages/ErrorPage/ErrorPage'
import RegisteredCamps from '../pages/Dashboard/RegisteredCamps/RegisteredCamps'
import Payment from '../pages/Dashboard/Payment/Payment'
import PaymentHistory from '../pages/Dashboard/PaymentHistory/PaymentHistory'
import ManageRegisteredCamps from '../pages/Dashboard/Admin/ManageRegisteredCamps/ManageRegisteredCamps'
import Analytics from '../pages/Dashboard/Analytics/Analytics'
import AllServices from '../pages/AllServices/AllServices'
import AdminOverview from '../pages/Dashboard/Admin/AdminOverview/AdminOverview'


export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        errorElement: <ErrorPage />,
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
                path: 'camp-details/:campId',
                element: <CampDetails></CampDetails>
            },

            {
                path: 'login',
                element: <Login></Login>
            },
            {
                path: 'register',
                element: <Register></Register>
            },
            {
                path: 'all-services',
                element: <AllServices></AllServices>
            }
        ],
    },
    {
        path: 'dashboard',
        element: <PrivateRoute>
            <DashboardLayout></DashboardLayout>
        </PrivateRoute>,
        children: [
            {
                index: true,
                element: <PrivateRoute>
                    <Profile></Profile>
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
            },
            {
                path: 'update-camp/:id',
                element: <PrivateRoute>
                    <AdminRoute>
                        <UpdateCamp></UpdateCamp>
                    </AdminRoute>
                </PrivateRoute>
            },
            {
                path: 'admin-overview',
                element: <PrivateRoute>
                    <AdminOverview></AdminOverview>
                </PrivateRoute>
            },
            {
                path: 'manage-registered-camps',
                element: <PrivateRoute>
                    <AdminRoute>
                        <ManageRegisteredCamps></ManageRegisteredCamps>
                    </AdminRoute>
                </PrivateRoute>
            },
            {
                path: 'registered-camps',
                element: <PrivateRoute>
                    <RegisteredCamps></RegisteredCamps>
                </PrivateRoute>
            },
            {
                path: 'payment/:id',
                element: <PrivateRoute>
                    <Payment></Payment>
                </PrivateRoute>
            },
            {
                path: 'payment-history',
                element: <PrivateRoute>
                    <PaymentHistory></PaymentHistory>
                </PrivateRoute>
            },
            {
                path: 'analytics',
                element: <PrivateRoute>
                    <Analytics></Analytics>
                </PrivateRoute>
            }

        ]
    }


])