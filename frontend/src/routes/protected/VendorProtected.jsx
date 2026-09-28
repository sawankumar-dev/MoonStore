import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router'

const VendorProtected = () => {
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    if(!isAuthenticated || user?.role !== 'vendor') {
     
        return <Navigate to='/' replace/>
    } 
  return (
    <Outlet/>
  )
}

export default VendorProtected