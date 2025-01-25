import { Navigate } from 'react-router-dom'
import useRole from '../hooks/useRole'

const AdminRoute = ({ children }) => {
    const [role, isLoading] = useRole()
    if (isLoading) return <h1>Loading....</h1>
    if (role === 'admin') return children
    return <Navigate to='/dashboard' replace='true' />
}


export default AdminRoute