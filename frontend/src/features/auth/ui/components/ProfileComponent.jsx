import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LogOut, User, Settings, CreditCard } from 'lucide-react'; // Icons ke liye (Optional: npm i lucide-react)
import { logoutUserAction } from '../../state/authActions';
import { useNavigate } from 'react-router';

const ProfileComponent = () => {
    const { user } = useSelector((state) => state.auth);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const name = user?.name || "User";

    // Dropdown ke bahaar click karne par menu close karne ke liye
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        // Yahan aap apna logout action dispatch kar sakte hain
        console.log("Logging out...");
        dispatch(logoutUserAction())
    };
    const handleAdmin = () => {
        navigate('/admin')
    };
    const handleVendor = () => {
        navigate("/vendor")
    }
    const handleProfile = () => {
        navigate("/profile")
    }
    return (
        <div className="relative" ref={dropdownRef}>
            {/* Profile Avatar Button */}
            <button 
                onClick={() => setIsOpen(!isOpen)}
                onMouseEnter={() => setIsOpen(true)} // Hover par kholne ke liye
                className="flex items-center justify-center h-10 w-10 bg-slate-800 text-emerald-400 font-semibold text-lg rounded-full border border-slate-700 hover:border-emerald-500 hover:bg-slate-700/50 shadow-inner transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer uppercase select-none tracking-wider"
            >
                {name[0]}
            </button>

            {/* Dropdown Board (Menu) */}
            {isOpen && (
                <div 
                    onMouseLeave={() => setIsOpen(false)} // Mouse hatne par band karne ke liye
                    className="absolute right-0 mt-3 w-56 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-5 duration-200"
                >
                    {/* User Info Header */}
                    <div className="px-4 py-3 border-b border-slate-800">
                        <p className="text-xs text-slate-400">Signed in as</p>
                        <p className="text-sm font-semibold text-white truncate">{name}</p>
                        <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                    </div>

                    {/* Menu Links */}
                    <div className="p-1">
                        <button onClick={() => handleProfile()} className="flex w-full items-center gap-3 px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 rounded-lg transition-colors text-left cursor-pointer">
                            <User className="h-4 w-4 text-slate-400" /> My Profile
                        </button>

                        {/* 🌟 Dynamic Vendor / Dashboard Button */}
                        {user?.role === "customer" && (
                            <button onClick={()=>navigate("become-vendor")} className="flex w-full items-center gap-3 px-3 py-2 text-sm font-medium text-emerald-400 hover:bg-emerald-500/10 rounded-lg transition-colors text-left cursor-pointer mt-1 border border-dashed border-emerald-500/30">
                                <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                                Become a Vendor
                            </button>
                        )}

                        {user?.role === "vendor" && (
                            <button onClick={() => handleVendor()} className="flex w-full items-center gap-3 px-3 py-2 text-sm font-medium text-indigo-400 hover:bg-indigo-500/10 rounded-lg transition-colors text-left cursor-pointer mt-1 border border-dashed border-indigo-500/30">
                                <span className="flex h-2 w-2 rounded-full bg-indigo-400"></span>
                                Vendor Dashboard
                            </button>
                        )}

                        {user?.role === "admin" && (
                            <button onClick={() => handleAdmin()} className="flex w-full items-center gap-3 px-3 py-2 text-sm font-medium text-amber-400 hover:bg-amber-500/10 rounded-lg transition-colors text-left cursor-pointer mt-1 border border-dashed border-amber-500/30">
                                <span className="flex h-2 w-2 rounded-full bg-amber-400"></span>
                                Admin Panel
                            </button>
                        )}
                    </div>

                    {/* Divider */}
                    <div className="border-t border-slate-800 my-1"></div>

                    {/* Logout Button */}
                    <div className="p-1">
                        <button 
                            onClick={handleLogout}
                            className="flex w-full items-center gap-3 px-3 py-2 text-sm text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors text-left font-medium cursor-pointer"
                        >
                            <LogOut className="h-4 w-4" /> Log out
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileComponent;
