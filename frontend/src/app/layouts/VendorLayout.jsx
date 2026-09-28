import React from 'react'
import { Outlet } from 'react-router'
import { LayoutDashboard, PlusCircle, ShoppingBag, Home } from 'lucide-react'
import { NavLink } from 'react-router'

const VendorLayout = () => {
  // Sidebar styling helper
  const linkStyles = ({ isActive }) => 
    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 select-none cursor-pointer ${
      isActive 
        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-sm" 
        : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60"
    }`

  return (
    <div className="min-h-screen grid grid-cols-5 bg-slate-950 text-slate-100">
      {/* 1 Column for Sidebar */}
      <aside className="col-span-1 h-screen sticky top-0 flex flex-col bg-slate-950 border-r border-slate-900 p-4 justify-between">
        <div className="flex flex-col gap-6">
          {/* Logo Heading */}
          <div className="flex items-center gap-2.5 px-2 py-1 border-b border-slate-900 pb-4">
            <div className="h-7 w-7 bg-emerald-500 rounded-lg flex items-center justify-center font-black text-slate-950 text-sm shadow-md">V</div>
            <span className="font-bold text-base tracking-wider bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">MOONSTORE</span>
            <span className="text-[10px] font-bold text-slate-500 bg-slate-900 border border-slate-800 px-1.5 py-0.5 rounded-full uppercase">Vendor</span>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1.5">
            <NavLink to="/vendor" end className={linkStyles}>
              <LayoutDashboard className="h-4 w-4 shrink-0" />
              <span>Overview (Soon)</span>
            </NavLink>
            <NavLink to="/vendor/add-product" className={linkStyles}>
              <PlusCircle className="h-4 w-4 shrink-0" />
              <span>Add Product</span>
            </NavLink>
            <NavLink to="/vendor/products" className={linkStyles}>
              <ShoppingBag className="h-4 w-4 shrink-0" />
              <span>My Products (Soon)</span>
            </NavLink>
          </nav>
        </div>

        {/* Footer Link */}
        <div className="border-t border-slate-900 pt-4">
          <NavLink to="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-400 hover:text-rose-400 hover:bg-rose-500/5 transition-all duration-200">
            <Home className="h-4 w-4 shrink-0" />
            <span>Back to Store</span>
          </NavLink>
        </div>
      </aside>

      {/* 4 Columns for Main Content Panel */}
      <main className="col-span-4 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}

export default VendorLayout
