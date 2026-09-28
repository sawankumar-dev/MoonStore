import React from 'react'
import { NavLink } from 'react-router'
import { LayoutDashboard, Users, Store, Home, ArrowLeftRight } from 'lucide-react' // Icons ke liye

const AdminSidebar = () => {
  // Reusable active function for NavLink styling
  const linkStyles = ({ isActive }) => 
    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 select-none cursor-pointer ${
      isActive 
        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-sm font-semibold shadow-emerald-950/20" 
        : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60"
    }`

  return (
    <aside className="h-screen sticky top-0 flex flex-col bg-slate-950 border-r border-slate-900 p-4 justify-between">
      {/* Top Part: Branding & Menu Links */}
      <div className="flex flex-col gap-6">
        {/* Brand/Logo Heading */}
        <div className="flex items-center gap-2.5 px-2 py-1 border-b border-slate-900 pb-4">
          <div className="h-7 w-7 bg-emerald-500 rounded-lg flex items-center justify-center font-black text-slate-950 text-sm shadow-md">
            M
          </div>
          <span className="font-bold text-base tracking-wider bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            MOONSTORE
          </span>
          <span className="text-[10px] font-bold text-slate-500 bg-slate-900 border border-slate-800 px-1.5 py-0.5 rounded-full uppercase scale-90">
            Admin
          </span>
        </div>

        {/* Navigation Core Menu */}
        <nav className="flex flex-col gap-1.5">
          <NavLink to="/admin" end className={linkStyles}>
            <LayoutDashboard className="h-4 w-4 shrink-0" />
            <span>Dashboard</span>
          </NavLink>

          {/* 🌟 Naya Users / Customers Link */}
          <NavLink to="/admin/users" className={linkStyles}>
            <Users className="h-4 w-4 shrink-0" />
            <span>Manage Users</span>
          </NavLink>

          <NavLink to="/admin/vendor-request" className={linkStyles}>
            <ArrowLeftRight className="h-4 w-4 shrink-0" />
            <span>Vendor Requests</span>
          </NavLink>

          <NavLink to="/admin/vendors" className={linkStyles}>
            <Store className="h-4 w-4 shrink-0" />
            <span>Active Vendors</span>
          </NavLink>
        </nav>
      </div>

      {/* Bottom Part: Back to Main Website Action */}
      <div className="border-t border-slate-900 pt-4">
        <NavLink to="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-400 hover:text-rose-400 hover:bg-rose-500/5 transition-all duration-200 cursor-pointer">
          <Home className="h-4 w-4 shrink-0" />
          <span>Back to Home</span>
        </NavLink>
      </div>
    </aside>
  )
}

export default AdminSidebar
