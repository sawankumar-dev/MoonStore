import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router'

const ProtectedRoutes = () => {
    const { isAuthenticated } = useSelector((state) => state.auth)
    if(!isAuthenticated) {
        return <Navigate to='/auth' replace/>
    }
  return (
    <Outlet/>
  )
}

export default ProtectedRoutes