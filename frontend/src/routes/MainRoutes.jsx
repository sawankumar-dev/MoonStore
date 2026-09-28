import { lazy, useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router'
import HomePage from '../shared/ui/pages/HomePage'
import ProductsPage from '../shared/ui/pages/ProductsPage'
import ProtectedRoutes from './protected/ProtectedRoutes'
import LoginPage from '../features/auth/ui/pages/LoginPage'
import PublicRoutes from './protected/PublicRoutes'
import MainLayout from '../app/layouts/Mainlayout'
import RegisterPage from '../features/auth/ui/pages/RegisterPage'
import AboutPage from '../shared/ui/pages/AboutPage'
import { hydrateUserAction } from '../features/auth/state/authActions'
import { useDispatch } from 'react-redux'
import VendorApplicationForm from '../features/vendor/ui/pages/VendorApplicationFormPage'
import VendorProtected from './protected/VendorProtected'
import AdminProtected from './protected/AdminProtected'
import VendorLayout from '../app/layouts/VendorLayout'
import AdminLayout from '../app/layouts/AdminLayout'
const VendorRequestsList = lazy(() => import("../features/admin/ui/pages/VendorRequestsList"));
import Dashboard from '../features/admin/ui/pages/Dashboard'
import VendorsList from '../features/admin/ui/pages/VendorsList'
import UsersList from '../features/admin/ui/pages/UsersList'
import AddProduct from '../features/vendor/ui/pages/AddProduct'
import VendorProducts from '../features/vendor/ui/pages/VendorProducts'
import SingleProductPage from '../features/products/ui/pages/SingleProductPage'
import { api } from '../config/api'
import VendorProductsView from '../features/admin/ui/pages/VendorProductsView'
import VendorDetailsPage from '../features/admin/ui/pages/VendorDetailsPage'
import ProfilePage from '../features/auth/ui/pages/ProfilePage'
const CartPage = lazy(() => import('../features/cart/ui/pages/CartPage')) 

const singleProductLoader = async ({ params }) => {
    const response = await api.get(`/product/${params.productId}`)
    return response.data
}
const vendorProductsLoader = async ({ params }) => {
    const response = await api.get(`/vendor-products/${params.vendorId}`)
    return response.data
}
const VendorDetailsLoader = async ({ params }) => {
    const response = await api.get(`/vendor-details/${params.vendorId}`)
    return response.data
}
   const router = createBrowserRouter([
    {
        path: "/",
        element: <ProtectedRoutes />,
        children: [
        {
            // empty path "" ko hata kar layout ko sidhe children bna diya
            element: <MainLayout />, 
            children: [
            { index: true, element: <HomePage /> }, // path: "" ki jagah index: true
            { path: "about", element: <AboutPage /> },
            { path: "cart", element: <CartPage /> },
            { path: "profile", element: <ProfilePage/> },
            { path: "products", element: <ProductsPage /> },
            { path: "become-vendor", element: <VendorApplicationForm /> },
            { path: "product/:productId", element: <SingleProductPage />, loader: singleProductLoader },
            ]
        }
        ]
    },
    {
        path: "/auth",
        element: <PublicRoutes />,
        children: [
        { index: true, element: <LoginPage /> }, // path: "" ki jagah index: true
        { path: "register", element: <RegisterPage /> },

        ],
    },
    {
        path: '/vendor',
        element: <VendorProtected />,
        children: [
        {
            path: "",
            element: <VendorLayout />, // Layout se path "" hata diya
            children: [
            { path: "add-product", element: <AddProduct /> },
            { path: "products", element: <VendorProducts /> },
            ]
        }
        ]
    },
    {
        path: "/admin",
        element: <AdminProtected />,
        children: [
        {
            element: <AdminLayout />, // Layout se path "" hata diya
            children: [
            { index: true, element: <Dashboard /> }, // Default admin page
            { path: "vendor-request", element: <VendorRequestsList /> },
            { path: "vendors", element: <VendorsList /> },
            { path: "users", element: <UsersList /> },
            { path: "vendor-products/:vendorId",element: <VendorProductsView/>, loader: vendorProductsLoader},
            { path: "vendor-details/:vendorId", element: <VendorDetailsPage/>, loader: VendorDetailsLoader }
            ]
        }
        ]
    }
    ]);
const MainRoutes = () => {
    const dispatch = useDispatch();
    useEffect(() => {
      (() => {
        try {
          dispatch(hydrateUserAction())
        } catch (error) {
         console.log("error in hydration", error) 
        }
      })()
    }, [])

  return (
    <RouterProvider router={router}/>
  )
}

export default MainRoutes

