import AdminSidebar from "../../features/admin/ui/components/AdminSidebar"
import { Outlet } from "react-router"

const AdminLayout = () => {
  return (
    // Parent me grid-cols-5 perfect hai
    <div className="min-h-screen grid grid-cols-5 bg-slate-950 text-slate-100">
      
      {/* 🔴 Sidebar ko exact 1 column diya */}
      <div className="col-span-1 border-r border-slate-800">
        <AdminSidebar />
      </div>

      {/* 🔴 Main content area ko exact 4 columns diye */}
      <main className="col-span-4 p-6 overflow-y-auto">
        <Outlet />
      </main>

    </div>
  )
}

export default AdminLayout
