import { Navigate } from 'react-router-dom'
import useRole from '../hooks/useRole'
import Loading from '../components/Loading/Loading'

const AdminRoute = ({ children }) => {
    const [role, isLoading] = useRole()
    if (isLoading) return <Loading></Loading>
    if (role === 'admin') return children
    return <Navigate to='/dashboard' replace='true' />
}


export default AdminRoute