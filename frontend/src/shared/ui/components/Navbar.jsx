import React from 'react'
import { NavLink } from 'react-router' // React Router v7 version ke mutabik
import { Box, House, ShoppingCart, LogIn, Users, ListSortAscending } from 'lucide-react';
import { useSelector } from 'react-redux';
import ProfileComponent from '../../../features/auth/ui/components/ProfileComponent';

const Navbar = () => {
    const { name, isAuthenticated } = useSelector((state) => state.auth)
  // Active aur Base classes ko ek function mein wrap kiya taaki baar-baar code na likhna pade
  const navLinkStyles = ({ isActive }) => 
    `flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ease-in-out ${
      isActive 
        ? 'text-green-400 bg-gray-700/50 shadow-sm' 
        : 'text-gray-300 hover:text-white hover:bg-gray-700/30'
    }`;

  return (
    <div className='flex  items-center justify-between max-w-6xl w-full bg-gray-900 border border-gray-800 text-gray-100 mx-auto px-6 py-4 rounded-xl shadow-lg'>
        
        {/* Logo / Brand Section */}
        <div className='flex items-center gap-2 cursor-pointer group'>
            <ListSortAscending  
                className="rotate-270 text-green-400 transition-transform duration-300 group-hover:scale-110" 
                size={22} 
            />
            <h2 className='text-xl font-bold tracking-wider bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent'>
                MOONSTORE
            </h2>
        </div>

        {/* Navigation Links */}
        <nav className='flex items-center gap-2'>
            <NavLink className={navLinkStyles} to="/">
                <House size={18} />
                <span>Home</span>
            </NavLink>

            <NavLink className={navLinkStyles} to="/about">
              <Users size={18} />
              <span>About us</span>
            </NavLink>

            <NavLink className={navLinkStyles} to="/products">
                <Box size={18}/>
                <span>Products</span>
            </NavLink>

            <NavLink className={navLinkStyles} to="/cart">
                <ShoppingCart size={18} />
                <span>Cart</span>
            </NavLink>
        </nav>

        {/* Right side Utility / Login Button */}
        <div>
            {isAuthenticated ? <ProfileComponent/>: <NavLink 
                className={({ isActive }) => 
                  `flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg border transition-all duration-200 ${
                    isActive 
                      ? 'bg-green-500 text-gray-900 border-green-500 shadow-md shadow-green-500/10' 
                      : 'border-gray-700 text-gray-300 hover:text-white hover:border-gray-500 hover:bg-gray-800'
                  }`
                } 
                to="/login"
            >
                <LogIn size={16}/>
                <span>Login</span>
            </NavLink>}
            
        </div>
    </div>
  )
}

export default Navbar;
